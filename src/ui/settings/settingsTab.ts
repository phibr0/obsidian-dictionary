import type DictionaryPlugin from "src/main";

import { App, PluginSettingTab, Setting } from "obsidian";
import { LANGUAGES } from "src/_constants";

export default class SettingsTab extends PluginSettingTab {
	plugin: DictionaryPlugin;

	constructor(app: App, plugin: DictionaryPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		let { containerEl } = this;

		containerEl.empty();

		containerEl.createEl('h2', { text: 'Dictionary Settings' });

		new Setting(containerEl)
			.setName('Language')
			.setDesc('The Language the Plugin will use to search for Definitions and Pronunciations.')
			.addDropdown((dropdown) => {
				for (const language in LANGUAGES) {
					dropdown.addOption(language, language);
				}
				dropdown.setValue(this.plugin.settings.defaultLanguage)
					.onChange(async (value) => {
						this.plugin.settings.defaultLanguage = value;
						await this.plugin.saveSettings();
						this.display();
					});
			});
		new Setting(containerEl)
			.setName('Definition Provider')
			.setDesc('The API the Plugin will use to search for Definitions.')
			.addDropdown((dropdown) => {
				for (const api of this.plugin.manager.definitionProvider) {
					if (api.supportedLanguagesD.contains(this.plugin.settings.defaultLanguage)) {
						dropdown.addOption(api.name, api.name);
					}
				}
				dropdown.setValue(this.plugin.settings.definitionApiName)
					.onChange(async (value) => {
						this.plugin.settings.definitionApiName = value;
						await this.plugin.saveSettings();
					});
			});
		new Setting(containerEl)
			.setName('Synonym Provider')
			.setDesc('The API the Plugin will use to search for Synonyms.')
			.addDropdown((dropdown) => {
				for (const api of this.plugin.manager.synonymProvider) {
					if (api.supportedLanguagesS.contains(this.plugin.settings.defaultLanguage)) {
						dropdown.addOption(api.name, api.name);
					}
				}
				dropdown.setValue(this.plugin.settings.synonymApiName)
					.onChange(async (value) => {
						this.plugin.settings.synonymApiName = value;
						await this.plugin.saveSettings();
					});
			});
	}
}
