/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { DictionarySettings } from 'src/types';

import { debounce, Editor, MarkdownView, Menu, Plugin, WorkspaceLeaf } from 'obsidian';
import { matchCasing } from "match-casing";
import SettingsTab from 'src/ui/settings/settingsTab';
import DictionaryView from 'src/ui/dictionary/dictionaryView';
import { DEFAULT_SETTINGS, VIEW_TYPE } from 'src/_constants';
import APIManager from 'src/apiManager';
import { Coords, SynonymPopover } from 'src/ui/synonyms/synonymPopover';
import handleContextMenu from 'src/ui/customContextMenu';
import { addIcons } from 'src/ui/icons';
import t from 'src/l10n/helpers';
import LocalDictionaryBuilder from 'src/localDictionaryBuilder';
import LanguageChooser from 'src/ui/modals/languageChooser';

export default class DictionaryPlugin extends Plugin {
    settings: DictionarySettings;
    manager: APIManager;
    localDictionary: LocalDictionaryBuilder;
    synonymPopover: SynonymPopover | null = null;

    menus = [
        {
            pluginName: this.manifest.id,
            name: t('Show Synonyms'),
            icon: 'synonyms',
            onClick: (instance: CodeMirror.Editor): void => {
                if (instance.getSelection()) {
                    this.handlePointerUp();
                }
            },
            enabled: true,
        },
        {
            pluginName: this.manifest.id,
            name: t('Look up'),
            icon: 'quote-glyph',
            onClick: async (instance: CodeMirror.Editor): Promise<void> => {
                if (instance.getSelection()) {
                    let leaf: WorkspaceLeaf = this.app.workspace.getLeavesOfType(VIEW_TYPE).first();
                    if (!leaf) {
                        leaf = this.app.workspace.getRightLeaf(false);
                        await leaf.setViewState({
                            type: VIEW_TYPE,
                        });
                    }
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    leaf.view.query(instance.getSelection());
                    this.app.workspace.revealLeaf(leaf);
                }
            },
            enabled: true,
        },
    ];

    async onload(): Promise<void> {
        console.log('loading dictionary');

        await this.loadSettings();

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

        this.localDictionary = new LocalDictionaryBuilder(this);

        // Remove this ignore when the obsidian package is updated on npm
        // Editor mode
        // @ts-ignore
        this.registerEvent(this.app.workspace.on('editor-menu', this.handleContextMenuHelper));
    }

    onunload(): void {
        console.log('unloading dictionary');
        this.app.workspace.off('editor-menu', this.handleContextMenuHelper)
    }

    handleContextMenuHelper = (menu: Menu, editor: Editor, _: MarkdownView) => {
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
                        coords = (editor as any).coordsAtPos(offset);
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

    async saveSettings(): Promise<void> {
        await this.saveData(this.settings);
    }
}
