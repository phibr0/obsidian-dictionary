import type {
    DefinitionProvider,
    DictionaryWord,
    PartOfSpeech,
    PartOfSpeechProvider,
    Synonym,
    SynonymProvider,
} from "src/integrations/types";
import type DictionarySettings from "src/types";

import {
    FreeDictionaryDefinitionProvider,
    FreeDictionarySynonymProvider,
} from "src/integrations/freeDictionaryAPI";
import { OpenThesaurusSynonymAPI } from "src/integrations/openThesaurusAPI";
import { SystranPOSProvider } from "src/integrations/systranAPI";
import { SynonymoSynonymAPI } from "src/integrations/synonymoAPI";
import { AltervistaSynonymProvider } from "src/integrations/altervistaAPI";

/*
HOW TO ADD A NEW API:

1. Add a new class that implements DefinitionProvider or
SynonymProvider (or both) and put the file in /src/api/
2. Push the new Provider to the right list in the
APIManager, as seen below
3. Test the Solution
4. Create a new Pull Request on GitHub
*/

export default class APIManager {
    private settings: DictionarySettings;

    // Adds new API's to the Definition Providers
    definitionProvider: DefinitionProvider[] = [
        new FreeDictionaryDefinitionProvider(),
    ];
    // Adds new API's to the Synonym Providers
    synonymProvider: SynonymProvider[] = [
        new FreeDictionarySynonymProvider(),
        new OpenThesaurusSynonymAPI(),
        new SynonymoSynonymAPI(),
        new AltervistaSynonymProvider(),
    ];
    // Adds new API's to the Part Of Speech Providers
    partOfSpeechProvider: PartOfSpeechProvider[] = [
        new SystranPOSProvider(),
    ];

    constructor(settings: DictionarySettings) {
        this.settings = settings;
    }

    /**
     * Sends a request with the passed query to the chosen API and returns the Result
     *
     * @param query - The term you want to look up
     * @returns The API Response of the chosen API as Promise<DictionaryWord>
     */
    public requestDefinitions(query: string): Promise<DictionaryWord> {
        return this.getDefinitionAPI().requestDefinitions(
            query,
            this.settings.defaultLanguage
        );
    }

    /**
     * Sends a request with the passed query to the chosen API and returns the resulting Synonyms
     *
     * @param query - The term you want to look up
     * @param pos - The part of speech of the target word
     * @returns The API Response of the chosen API as Promise<Synonym[]>
     */
    public requestSynonyms(query: string, pos?: PartOfSpeech): Promise<Synonym[]> {
        return this.getSynonymAPI().requestSynonyms(
            query,
            this.settings.defaultLanguage,
            pos
        );
    }

    /**
     * Sends a request with the passed word to the chosen API and returns the detected part of speech
     *
     * @param word - The word you want to look up
     * @param leftContext - The sentence content before the word
     * @param rightContext - The sentence content after the word
     * @returns The API Response of the chosen API as Promise<PartOfSpeech>
     */
    public requestPartOfSpeech(
        word: string,
        leftContext: string,
        rightContext: string
    ): Promise<PartOfSpeech> {
        return this.getPartOfSpeechAPI()?.requestPartOfSpeech(
            word,
            leftContext,
            rightContext,
            this.settings.defaultLanguage
        );
    }

    /**
     * @returns Returns the currently active Definition API
     */
    private getDefinitionAPI() {
        return this.definitionProvider.find(
            (api) => api.name == this.settings.definitionApiName
        );
    }

    /**
     * @returns Returns the currently active Synonym API
     */
    private getSynonymAPI() {
        return this.synonymProvider.find(
            (api) => api.name == this.settings.synonymApiName
        );
    }

    /**
     * @returns Returns the currently active part of speech API
     */
    private getPartOfSpeechAPI() {
        return this.partOfSpeechProvider.find(
            this.settings.advancedSynonymAnalysis ? (api) => api.name == this.settings.partOfSpeechApiName : null
        );
    }
}
