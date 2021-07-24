import type DictionaryPlugin from "src/main";

import { ItemView, WorkspaceLeaf } from "obsidian";
import { VIEW_TYPE, VIEW_DISPLAY_TEXT, VIEW_ICON } from "src/_constants";
import DictionaryComponent from "./dictionaryView.svelte";
import LanguageChooser from "src/ui/modals/languageChooser";

export default class DictionaryView extends ItemView {

    plugin: DictionaryPlugin;
    private _view: DictionaryComponent;

    constructor(leaf: WorkspaceLeaf, plugin: DictionaryPlugin) {
        super(leaf);
        this.plugin = plugin;
    }

    query(query: string): void {
        this._view.$set({
            query: query
        });
        dispatchEvent(new Event("obsidian-dictionary-plugin-search"));
    }

    getViewType(): string {
        return VIEW_TYPE;
    }

    getDisplayText(): string {
        return VIEW_DISPLAY_TEXT;
    }

    getIcon(): string {
        return VIEW_ICON;
    }

    onClose(): Promise<void> {
        this._view.$destroy();
        return super.onClose();
    }

    onOpen(): Promise<void> {
        this._view = new DictionaryComponent({
            target: this.contentEl,
            props: {
                manager: this.plugin.manager,
                localDictionary: this.plugin.localDictionary,
            }
        });
        addEventListener('dictionary-open-language-switcher', () => {
            new LanguageChooser(this.app, this.plugin).open();
        });
        return super.onOpen();
    }

}
