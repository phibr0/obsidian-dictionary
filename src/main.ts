import { Plugin } from 'obsidian';
import SettingsTab from 'src/ui/settings/settingsTab';
import { DEFAULT_SETTINGS, DictionarySettings } from 'src/settings'
import DictionaryView from 'src/ui/dictionary/dictionaryView';
import { VIEW_TYPE } from 'src/_constants';



export default class DictionaryPlugin extends Plugin {
	settings: DictionarySettings;
	view: DictionaryView;

	async onload() {
		console.log('loading dictionary');

		await this.loadSettings();

		this.addSettingTab(new SettingsTab(this.app, this));

		this.registerView(VIEW_TYPE, (leaf) => {
			this.view = new DictionaryView(leaf, this)
			return this.view
		})

		this.app.workspace.getRightLeaf(false).setViewState({
			type: VIEW_TYPE,
		});
	}

	onunload() {
		console.log('unloading dictionary');
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}