import type DictionaryPlugin from "src/main";

import { App, Modal, PluginSettingTab, Setting } from "obsidian";
import { LANGUAGES } from "src/_constants";
import InfoModalComponent from './infoModal.svelte'
import t from "src/lang/helpers";

export default class SettingsTab extends PluginSettingTab {
    plugin: DictionaryPlugin;

    constructor(app: App, plugin: DictionaryPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;

        containerEl.empty();

        containerEl.createEl('h2', { text: t('Dictionary Settings') });

        new Setting(containerEl)
            .setName(t('Language'))
            .setDesc(t('The Language the Plugin will use to search for Definitions and Pronunciations.'))
            .addDropdown((dropdown) => {
                for (const language in LANGUAGES) {
                    dropdown.addOption(language, LANGUAGES[language]);
                }
                dropdown.setValue(this.plugin.settings.defaultLanguage)
                    .onChange(async (value) => {
                        this.plugin.settings.defaultLanguage = value;
                        await this.plugin.saveSettings();
                        this.display();
                    });
            });
        new Setting(containerEl)
            .setName(t('Synonym Suggestions'))
            .setDesc(t('Show synonyms for highlighted words'))
            .addToggle(toggle => {
                if (this.plugin.settings.shouldShowSynonymPopover) {
                    toggle.setValue(true)
                } else {
                    toggle.setValue(false)
                }

                toggle.onChange(async (value) => {
                    this.plugin.settings.shouldShowSynonymPopover = value;
                    await this.plugin.saveSettings();
                })
            });
        const desc = document.createDocumentFragment();
        desc.append(
            t('Enabling this will allow the Plugin to analyze full sentences to better suggest synonyms based on the context.'),
            desc.createEl("br"),
            t('Click '),
            desc.createEl("a", {
                href: "https://github.com/phibr0/obsidian-dictionary#privacy",
                text: t('here')
            }),
            t(' for Privacy Concerns.'),
        );
        new Setting(containerEl)
            .setName(t('Advanced Synonym Search'))
            .setDesc(desc)
            .addToggle(toggle => {
                if (this.plugin.settings.advancedSynonymAnalysis) {
                    toggle.setValue(true)
                } else {
                    toggle.setValue(false)
                }

                toggle.onChange(async (value) => {
                    this.plugin.settings.advancedSynonymAnalysis = value;
                    await this.plugin.saveSettings();
                })
            });
        new Setting(containerEl)
            .setName(t('Show Options in Context Menu'))
            .setDesc(t('Enable custom Context Menu with options to search for synonyms (only if the auto suggestions are disabled) and to look up a full definition in the Sidebar. Warning: This will override Obsidian\'s default Context Menu.'))
            .addToggle(toggle => {
                if (this.plugin.settings.shouldShowCustomContextMenu) {
                    toggle.setValue(true)
                } else {
                    toggle.setValue(false)
                }

                toggle.onChange(async (value) => {
                    this.plugin.settings.shouldShowCustomContextMenu = value;
                    await this.plugin.saveSettings();
                })
            });
        new Setting(containerEl)
            .setName(t('Definition Provider'))
            .setDesc(t('The API the Plugin will use to search for Definitions.'))
            .addDropdown((dropdown) => {
                for (const api of this.plugin.manager.definitionProvider) {
                    if (api.supportedLanguages.contains(this.plugin.settings.defaultLanguage)) {
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
            .setName(t('Synonym Provider'))
            .setDesc(t('The API the Plugin will use to search for Synonyms.'))
            .addDropdown((dropdown) => {
                for (const api of this.plugin.manager.synonymProvider) {
                    if (api.supportedLanguages.contains(this.plugin.settings.defaultLanguage)) {
                        dropdown.addOption(api.name, api.name);
                    }
                }
                dropdown.setValue(this.plugin.settings.synonymApiName)
                    .onChange(async (value) => {
                        this.plugin.settings.synonymApiName = value;
                        await this.plugin.saveSettings();
                    });
            });


        new Setting(containerEl)
            .setName(t('Local Dictionary Folder'))
            .setDesc(t('Specify a Folder, where all new Notes created by the Dictionary are placed. Please note that this Folder needs to already exist.'))
            .addText(text => text
                .setPlaceholder(t('Dictionary'))
                .setValue(this.plugin.settings.folder)
                .onChange(async (value) => {
                    this.plugin.settings.folder = value;
                    await this.plugin.saveSettings();
                }));
            
        
        new Setting(containerEl)
            .setName(t('More Information'))
            .setDesc(t('View Information about the API\'s and the Plugin itself.'))
            .setClass("extra")
            .addButton((bt) => {
                bt.setButtonText(t('More Info'))
                bt.onClick((_) => {
                    new InfoModal(this.plugin).open();
                });
            });
        new Setting(containerEl)
            .setName(t('Donate'))
            .setDesc(t('If you like this Plugin, consider donating to support continued development:'))
            .setClass("extra")
            .addButton((bt) => {
                bt.buttonEl.outerHTML = `<a href="https://www.buymeacoffee.com/phibr0"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=phibr0&button_colour=5F7FFF&font_colour=ffffff&font_family=Inter&outline_colour=000000&coffee_colour=FFDD00"></a>`;
            })
    }
}

class InfoModal extends Modal {
    plugin: DictionaryPlugin;
    private _view: InfoModalComponent;

    constructor(plugin: DictionaryPlugin) {
        super(plugin.app);
        this.plugin = plugin;
    }

    onOpen() {
        this.contentEl.parentElement.style.padding = "10px 12px";
        this._view = new InfoModalComponent({
            target: this.contentEl,
            props: {
                synonymAPIs: this.plugin.manager.synonymProvider,
                definitionAPIs: this.plugin.manager.definitionProvider,
                partOfSpeechAPIs: this.plugin.manager.partOfSpeechProvider,
            }
        });
    }

    onClose() {
        this._view.$destroy();
        this.contentEl.empty();
    }
}