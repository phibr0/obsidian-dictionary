/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { DictionaryCache, DictionarySettings } from 'src/types';
import type { APISettings } from './types';

import { debounce, Editor, MarkdownView, Menu, normalizePath, Plugin, WorkspaceLeaf } from 'obsidian';
import { matchCasing } from "match-casing";
import SettingsTab from 'src/ui/settings/settingsTab';
import DictionaryView from 'src/ui/dictionary/dictionaryView';
import { DEFAULT_SETTINGS, VIEW_TYPE } from 'src/_constants';
import APIManager from 'src/apiManager';
import { DEFAULT_CACHE,  RFC } from './_constants';
import { Coords, SynonymPopover } from 'src/ui/synonyms/synonymPopover';
import handleContextMenu from 'src/ui/customContextMenu';
import { addIcons } from 'src/ui/icons';
import t from 'src/l10n/helpers';
import LocalDictionaryBuilder from 'src/localDictionaryBuilder';
import LanguageChooser from 'src/ui/modals/languageChooser';
import { copy } from 'obsidian-community-lib';

export default class DictionaryPlugin extends Plugin {
    settings: DictionarySettings;
    manager: APIManager;
    localDictionary: LocalDictionaryBuilder;
    synonymPopover: SynonymPopover | null = null;
    cache: DictionaryCache;

    async onload(): Promise<void> {
        console.log('loading dictionary');

        await Promise.all([this.loadSettings(), this.loadCache()]);

        addIcons();

        this.addSettingTab(new SettingsTab(this.app, this));

        this.manager = new APIManager(this);

        this.registerView(VIEW_TYPE, (leaf) => {
            return new DictionaryView(leaf, this);
        });

        this.addCommand({
            id: 'dictionary-open-view',
            name: t('Open Dictionary View'),
            callback: async () => {
                if (this.app.workspace.getLeavesOfType(VIEW_TYPE).length == 0) {
                    await this.app.workspace.getRightLeaf(false).setViewState({
                        type: VIEW_TYPE,
                    });
                }
                this.app.workspace.revealLeaf(this.app.workspace.getLeavesOfType(VIEW_TYPE).first());
                dispatchEvent(new Event("dictionary-focus-on-search"));
            },
        });

        this.addCommand({
            id: 'dictionary-open-language-switcher',
            name: t('Open Language Switcher'),
            callback: () => {
                new LanguageChooser(this.app, this).open();
            },
        });

        this.registerDomEvent(document.body, "pointerup", () => {
            if (!this.settings.shouldShowSynonymPopover) {
                return;
            }
            this.handlePointerUp();
        });
        this.registerDomEvent(window, "keydown", () => {
            // Destroy the popover if it's open
            if (this.synonymPopover) {
                this.synonymPopover.destroy();
                this.synonymPopover = null;
            }
        });

        this.registerDomEvent(document.body, "contextmenu", (event) => {
            //@ts-ignore
            if (this.settings.shouldShowCustomContextMenu && event.path.find((el: HTMLElement) => {
                try {
                    return el.hasClass("markdown-preview-view");
                } catch (error) {
                    return false;
                }
            })) {
                const selection = window.getSelection().toString();
                if (selection && this.app.workspace.activeLeaf?.getViewState()?.state.mode === "preview") {
                    event.preventDefault();

                    const fileMenu = new Menu(this.app);

                    fileMenu.addItem((item) => {
                        item.setTitle(t('Copy'))
                            .setIcon('copy')
                            .onClick((_) => {
                                copy(selection);
                            });
                    });

                    if (selection.trim().split(" ").length === 1) {
                        fileMenu.addItem((item) => {
                            item.setTitle(t('Look up'))
                                .setIcon('quote-glyph')
                                .onClick(async (_) => {
                                    let leaf: WorkspaceLeaf = this.app.workspace.getLeavesOfType(VIEW_TYPE).first();
                                    if (!leaf) {
                                        leaf = this.app.workspace.getRightLeaf(false);
                                        await leaf.setViewState({
                                            type: VIEW_TYPE,
                                        });
                                    }
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    //@ts-ignore
                                    leaf.view.query(selection.trim());
                                    this.app.workspace.revealLeaf(leaf);
                                });
                        });
                    }

                    fileMenu.showAtPosition({ x: event.clientX, y: event.clientY });
                }
            }
        });

        this.localDictionary = new LocalDictionaryBuilder(this);
        
        this.registerEvent(this.app.workspace.on('editor-menu', this.handleContextMenuHelper));

        this.registerEvent(this.app.workspace.on('file-open', (file) => {
            if (file && this.settings.getLangFromFile) {
                let lang = this.app.metadataCache.getFileCache(file).frontmatter?.lang ?? null;
                if (!lang) {
                    lang = this.app.metadataCache.getFileCache(file).frontmatter?.language ?? null;
                }
                if (lang && Object.values(RFC).contains(lang)) {
                    this.settings.defaultLanguage = Object.keys(RFC)[Object.values(RFC).indexOf(lang)] as keyof APISettings;
                } else {
                    this.settings.defaultLanguage = this.settings.normalLang;
                }
                this.saveSettings();
            }
        }));
    }

    onunload(): void {
        console.log('unloading dictionary');
    }

    handleContextMenuHelper = (menu: Menu, editor: Editor, _: MarkdownView): void => {
        handleContextMenu(menu, editor, this);
    };

    // Open the synonym popover if a word is selected
    // This is debounced to handle double clicks
    handlePointerUp = debounce(
        () => {

            const activeLeaf = this.app.workspace.activeLeaf;

            if (activeLeaf?.view instanceof MarkdownView) {
                const view = activeLeaf.view;

                if (view.getMode() === 'source') {
                    const editor = view.editor;
                    const selection = editor.getSelection();

                    // Return early if we don't have anything selected, or if
                    // multiple words are selected
                    if (!selection || /\s/.test(selection)) return;

                    const cursor = editor.getCursor('from');
                    const line = editor.getLine(cursor.line);

                    let coords: Coords;

                    // Get the cursor position using the appropriate CM5 or CM6 interface
                    if ((editor as any).cursorCoords) {
                        coords = (editor as any).cursorCoords(true, 'window');
                    } else if ((editor as any).coordsAtPos) {
                        const offset = editor.posToOffset(cursor);
                        coords = (editor as any).cm.coordsAtPos?.(offset) ?? (editor as any).coordsAtPos(offset);
                    } else {
                        return;
                    }

                    this.synonymPopover = new SynonymPopover({
                        apiManager: this.manager,
                        advancedPoS: this.settings.advancedSynonymAnalysis,
                        coords,
                        cursor,
                        line,
                        selection,
                        onSelect: (replacement) => {
                            editor.replaceSelection(matchCasing(replacement, selection));
                        }
                    });
                }
            }
        },
        300,
        true
    );

    async loadSettings(): Promise<void> {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async loadCache(): Promise<void> {
        this.cache = Object.assign({}, DEFAULT_CACHE, await this.loadCacheFromDisk());
    }

    async loadCacheFromDisk(): Promise<DictionaryCache> {
        const path = normalizePath(`${this.manifest.dir}/cache.json`);
        if (!(await this.app.vault.adapter.exists(path))) {
            await this.app.vault.adapter.write(path, "{}");
        }
        return JSON.parse(await this.app.vault.adapter.read(path)) as DictionaryCache;
    }

    async saveCache(): Promise<void> {
        await this.app.vault.adapter.write(normalizePath(`${this.manifest.dir}/cache.json`), JSON.stringify(this.cache));
    }

    async saveSettings(): Promise<void> {
        await this.saveData(this.settings);
    }
}
