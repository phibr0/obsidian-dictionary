import type DictionaryPlugin from "src/main";

import { App, FuzzySuggestModal } from "obsidian";
import { LANGUAGES } from "src/_constants";
import t from "src/l10n/helpers";

export default class LanguageChooser extends FuzzySuggestModal<string>{
    plugin: DictionaryPlugin;

    constructor(app: App, plugin: DictionaryPlugin) {
        super(app);
        this.plugin = plugin;
        this.setPlaceholder(t("Choose a Language"));
    }

    getItems(): string[] {
        const items: string[] = [];
        for (const lang in LANGUAGES) {
            items.push(lang);
        }
        return items;
    }

    getItemText(item: string): string {
        if(item == this.plugin.settings.defaultLanguage) {
            return LANGUAGES[item] + ' 🗸';
        } else {
            return LANGUAGES[item];
        }
    }

    async onChooseItem(item: string): Promise<void> {
        this.plugin.settings.defaultLanguage = item as keyof typeof LANGUAGES;
        this.plugin.settings.normalLang = item as keyof typeof LANGUAGES;
        await this.plugin.saveSettings();
        this.close();
    }

}
