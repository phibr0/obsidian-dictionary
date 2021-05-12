import { ItemView, WorkspaceLeaf } from "obsidian";
import type DictionaryPlugin from "src/main";

export default class DictionaryView extends ItemView{

    plugin: DictionaryPlugin;

    constructor(leaf: WorkspaceLeaf, plugin: DictionaryPlugin) {
        super(leaf);
        this.plugin = plugin;
    }

    getViewType(): string {
        throw new Error("Method not implemented.");
    }
    getDisplayText(): string {
        throw new Error("Method not implemented.");
    }

}