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
		let {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'Dictionary Settings'});

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
			.setName('Default Language')
			.setDesc('The Dictionary tries to infer the proper Language, but you can set an Override here.')
			.addDropdown((dropdown) => {
				for(let language in LANGUAGES){
					dropdown.addOption(language, language);
				}
				dropdown.setValue(String(this.plugin.settings.defaultLanguage))
					.onChange(async (value) => {
						this.plugin.settings.defaultLanguage = value;
						await this.plugin.saveSettings();
					})
			})
	}
}
