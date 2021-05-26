import type DictionarySettings from 'src/types';

import { debounce, MarkdownView, Plugin } from 'obsidian';
import { matchCasing } from "match-casing";
import SettingsTab from 'src/ui/settings/settingsTab';
import DictionaryView from 'src/ui/dictionary/dictionaryView';
import { DEFAULT_SETTINGS, VIEW_TYPE } from 'src/_constants';
import APIManager from 'src/apiManager';
import { Coords, SynonymPopover } from 'src/ui/synonyms/synonymPopover';

export default class DictionaryPlugin extends Plugin {
	settings: DictionarySettings;
	manager: APIManager;
	synonymPopover: SynonymPopover | null = null;

	// Open the synonym popover if a word is selected
	// This is debounced to handle double clicks
	handlePointerUp = debounce(
		() => {
			if (!this.settings.shouldShowSynonymPopover) {
				return;
			}
			
			const activeLeaf = this.app.workspace.activeLeaf;

			if (activeLeaf?.view instanceof MarkdownView) {
				const view = activeLeaf.view;

				if (view.getMode() === 'source') {
					const editor = view.editor;
					const selection = editor.getSelection();

					// Return early if we don't have anything selected, or if
					// multiple words are selected
					if (!selection || /\s/.test(selection)) return;

					const cursor = editor.getCursor('from');
					const line = editor.getLine(cursor.line);

					let coords: Coords;

					// Get the cursor position using the appropriate CM5 or CM6 interface
					if ((editor as any).cursorCoords) {
						coords = (editor as any).cursorCoords(true, 'window');
					} else if ((editor as any).coordsAtPos) {
						const offset = editor.posToOffset(cursor);
						coords = (editor as any).coordsAtPos(offset);
					} else {
						return;
					}

					this.synonymPopover = new SynonymPopover({
						apiManager: this.manager,
						coords,
						cursor,
						line,
						selection,
						onSelect: (replacement) => {
							editor.replaceSelection(matchCasing(replacement, selection));
						}
					});
				}
			}
		},
		300,
		true
	);

	async onload() {
		console.log('loading dictionary');

		await this.loadSettings();

		this.addSettingTab(new SettingsTab(this.app, this));
		this.manager = new APIManager(this.settings);

		this.registerView(VIEW_TYPE, (leaf) => {
			return new DictionaryView(leaf, this);
		});

		this.addCommand({
			id: 'dictionary-open-view',
			name: 'Open Dictionary View',
			callback: () => {
				this.app.workspace.getRightLeaf(false).setViewState({
					type: VIEW_TYPE,
				});
			},
		});

		this.registerDomEvent(document.body, "pointerup", this.handlePointerUp)
		this.registerDomEvent(window, "keydown", () => {
			// Destroy the popover if it's open
			if (this.synonymPopover) {
				this.synonymPopover.destroy();
				this.synonymPopover = null;
			}
		})
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
