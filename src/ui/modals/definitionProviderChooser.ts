import { FuzzySuggestModal, App } from "obsidian";
import SynonymProviderChooser from "src/ui/modals/synonymProviderChooser";
import type DictionaryPlugin from "src/main";
import t from "src/l10n/helpers";

export default class DefinitionProviderChooser extends FuzzySuggestModal<string>{
    plugin: DictionaryPlugin;
    available: string[] = [];

    constructor(app: App, plugin: DictionaryPlugin) {
        super(app);
        this.plugin = plugin;
        for(let i = 0; i < this.plugin.manager.definitionProvider.length; i++){
            const api = this.plugin.manager.definitionProvider[i];
            if (api.supportedLanguages.contains(this.plugin.settings.defaultLanguage)) {
                this.available.push(api.name);
            }
        }
        this.setPlaceholder(t("Choose a Definition Provider Service"));
    }

    onOpen(): void {
        if (this.available.length <= 1) {
            this.onChooseItem(this.available.first() ?? null);
        }
        super.onOpen();
    }

    getItems(): string[] {
        return this.available;
    }

    getItemText(item: string): string {
        return item;
    }

    async onChooseItem(item: string): Promise<void> {
        const lang = this.plugin.settings.defaultLanguage;
        this.plugin.settings.apiSettings[lang].definitionApiName = item;
        await this.plugin.saveSettings();
        this.close();
        new SynonymProviderChooser(this.app, this.plugin).open();
    }

}