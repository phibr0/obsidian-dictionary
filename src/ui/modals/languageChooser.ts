import type DictionaryPlugin from "src/main";

import { App, FuzzySuggestModal } from "obsidian";
import { LANGUAGES } from "src/_constants";
import DefinitionProviderChooser from "src/ui/modals/definitionProviderChooser";

export default class LanguageChooser extends FuzzySuggestModal<string>{
    plugin: DictionaryPlugin;

    constructor(app: App, plugin: DictionaryPlugin) {
        super(app);
        this.plugin = plugin;
    }

    getItems(): string[] {
        const items: string[] = [];
        for (const lang in LANGUAGES) {
            items.push(lang);
        }
        return items;
    }

    getItemText(item: string): string {
        return LANGUAGES[item];
    }

    async onChooseItem(item: string): Promise<void> {
        this.plugin.settings.defaultLanguage = item;
        await this.plugin.saveSettings();
        this.close();
        new DefinitionProviderChooser(this.app, this.plugin).open();
    }

}
