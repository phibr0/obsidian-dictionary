import { ItemView, WorkspaceLeaf } from "obsidian";
import { VIEW_TYPE, VIEW_DISPLAY_TEXT, VIEW_ICON } from "src/_constants";
import DictionaryComponent from "./dictionaryView.svelte"
import type DictionaryPlugin from "src/main";

export default class DictionaryView extends ItemView {

    plugin: DictionaryPlugin;
    private _app: DictionaryComponent;

    constructor(leaf: WorkspaceLeaf, plugin: DictionaryPlugin) {
        super(leaf);
        this.plugin = plugin;
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

    async onClose() {
        this._app.$destroy();
    }

    async onOpen() {
        this._app = new DictionaryComponent({
          target: this.contentEl,
          props: {
              settings: this.plugin.settings,
          }
        });
    }

}
