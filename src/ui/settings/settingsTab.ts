import { App, PluginSettingTab, Setting } from "obsidian";
import { LANGUAGES } from "src/_constants";
import type DictionaryPlugin from "src/main";


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

		// new Setting(containerEl)
		// 	.setName('Setting #1')
		// 	.setDesc('It\'s a secret')
		// 	.addText(text => text
		// 		.setPlaceholder('Enter your secret')
		// 		.setValue('')
		// 		.onChange(async (value) => {
		// 			console.log('Secret: ' + value);
		// 			this.plugin.settings.mySetting = value;
		// 			await this.plugin.saveSettings();
		// 		}));
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
					})
			})
	}
}
