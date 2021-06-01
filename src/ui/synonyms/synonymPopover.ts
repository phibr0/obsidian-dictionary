import type APIManager from "src/apiManager";
import type { PartOfSpeech, Synonym } from 'src/integrations/types';
import type { EditorPosition } from "obsidian";
import SynonymPopoverComponent from './synonymPopover.svelte'

export interface Coords {
    top: number;
    left: number;
    bottom: number;
}

export interface SynonymProviderSettings {
    apiManager: APIManager;
    advancedPoS: boolean;
    coords: Coords;
    cursor: EditorPosition;
    line: string;
    selection: string;
    onSelect: (newWord: string) => void
}

export class SynonymPopover {
    private settings: SynonymProviderSettings;
    private _view: SynonymPopoverComponent;
    private isDestroyed = false;

    constructor(settings: SynonymProviderSettings) {
        this.settings = settings;
        this.openSynonymPopover();
    }

    destroy(): void {
        this._view?.$destroy();
        this.isDestroyed = true;
    }

    async openSynonymPopover(): Promise<void> {
        const {
            cursor,
            coords,
            line,
            selection,
            apiManager,
            onSelect
        } = this.settings

        const sentences = line.split(/[.!?]/g);
        let seen = 0;

        // Loop through each sentence until we find our target word
        for (const sentence of sentences) {
            if (seen <= cursor.ch && cursor.ch <= seen + sentence.length) {
                // Split the sentence to get the left and right contexts
                const before = sentence.substr(0, cursor.ch - seen)
                const after = sentence.substr(cursor.ch - seen + selection.length)

                let pos: PartOfSpeech;

                if(this.settings.advancedPoS){
                    try {
                        pos = await apiManager.requestPartOfSpeech(selection, before, after);
                    } catch (e) {
                        console.error(`Error determining part of speech for word ${selection}`, e);
                    }
                }

                let synonyms: Synonym[];

                // Return early if we've been destroyed
                if (this.isDestroyed) return;

                try {
                    synonyms = await apiManager.requestSynonyms(selection, pos);
                } catch (e) {
                    console.error(`Error requesting synonyms for word ${selection}`, e);
                }

                // Return early if we've been destroyed
                if (this.isDestroyed) return;
                if (!synonyms?.length) return;

                // Open the synonym popover
                this._view = new SynonymPopoverComponent({
                    intro: true,
                    target: document.body,
                    props: {
                        coords,
                        synonyms,
                        onSelect: (selection) => {
                            onSelect(selection);
                            this.destroy();
                        },
                        onClickOutside: () => {
                            this.destroy();
                        }
                    }
                });

                break;
            }

            seen += sentence.length + 1;
        }
    }
}
