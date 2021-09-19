import { OfflineDictionary } from './integrations/offlineDic';
import type {
    DefinitionProvider,
    DictionaryWord,
    PartOfSpeech,
    PartOfSpeechProvider,
    Synonym,
    SynonymProvider,
} from "src/integrations/types";

import {
    FreeDictionaryDefinitionProvider,
    FreeDictionarySynonymProvider,
} from "src/integrations/freeDictionaryAPI";
import { OpenThesaurusSynonymAPI as OpenThesaurusSynonymProvider } from "src/integrations/openThesaurusAPI";
// import { SynonymoSynonymAPI as SynonymoSynonymProvider } from "src/integrations/synonymoAPI";
import { AltervistaSynonymProvider } from "src/integrations/altervistaAPI";
import type DictionaryPlugin from "src/main";

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
    plugin: DictionaryPlugin;

    // Adds new API's to the Definition Providers
    definitionProvider: DefinitionProvider[] = [
        new FreeDictionaryDefinitionProvider(),
        new OfflineDictionary(this),
    ];
    // Adds new API's to the Synonym Providers
    synonymProvider: SynonymProvider[] = [
        new FreeDictionarySynonymProvider(),
        new OpenThesaurusSynonymProvider(),
        // new SynonymoSynonymProvider(), see #44
        new AltervistaSynonymProvider(),
    ];
    // Adds new API's to the Part Of Speech Providers
    partOfSpeechProvider: PartOfSpeechProvider[] = [
        //new SystranPOSProvider(), See Issue #46
    ];

    constructor(plugin: DictionaryPlugin) {
        this.plugin = plugin;
    }

    /**
     * Sends a request with the passed query to the chosen API and returns the Result
     *
     * @param query - The term you want to look up
     * @returns The API Response of the chosen API as Promise<DictionaryWord>
     */
    public async requestDefinitions(query: string): Promise<DictionaryWord> {
        //Get the currently enabled API
        const api = this.getDefinitionAPI();
        const { cache, settings } = this.plugin;

        if (settings.useCaching && !api.name.toLowerCase().contains("offline")) {
            //Get any cached Definitions
            const cachedDefinition = cache.cachedDefinitions.find((c) => { return c.content.word.toLowerCase() == query.toLowerCase() && c.lang == settings.defaultLanguage && c.api == api.name });
            //If cachedDefiniton exists return it as a Promise
            if (cachedDefinition) {
                return new Promise((resolve) => resolve(cachedDefinition.content));
            } else {
                //If it doesnt exist request a new Definition
                const result = api.requestDefinitions(query, settings.defaultLanguage);

                //If the word gets found by the API cache it for later use
                const awaitedResult = await result;
                if (awaitedResult) {
                    cache.cachedDefinitions.push({ content: awaitedResult, api: api.name, lang: settings.defaultLanguage });
                    await this.plugin.saveCache();
                }

                //finally return the Promise so it can be awaited by the UI
                return result;
            }
        } else {
            return api.requestDefinitions(query, this.plugin.settings.defaultLanguage);
        }
    }

    /**
     * Sends a request with the passed query to the chosen API and returns the resulting Synonyms
     *
     * @param query - The term you want to look up
     * @param pos - The part of speech of the target word
     * @returns The API Response of the chosen API as Promise<Synonym[]>
     */
    public async requestSynonyms(query: string, pos?: PartOfSpeech): Promise<Synonym[]> {
        const api = this.getSynonymAPI();
        if (!api) {
            throw ("No Synonym API selected/available");
        }
        const { cache, settings } = this.plugin;
        if (settings.useCaching && !api.name.toLowerCase().contains("offline")) {
            const cachedSynonymCollection = cache.cachedSynonyms.find((s) => { return s.word.toLowerCase() == query.toLowerCase() && s.lang == settings.defaultLanguage && s.api == api.name });
            if (cachedSynonymCollection) {
                return new Promise((resolve) => resolve(cachedSynonymCollection.content));
            } else {
                const result = api.requestSynonyms(query, settings.defaultLanguage);
                const awaitedResult = await result;
                if (awaitedResult) {
                    cache.cachedSynonyms.push({ content: awaitedResult, api: api.name, word: query, lang: settings.defaultLanguage });
                    await this.plugin.saveCache();
                }
                return result;
            }
        } else {
            return api.requestSynonyms(query, this.plugin.settings.defaultLanguage, pos);
        }
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
            this.plugin.settings.defaultLanguage
        );
    }

    /**
     * @returns Returns the currently selected Definition API
     */
    private getDefinitionAPI(): DefinitionProvider {
        const lang = this.plugin.settings.defaultLanguage;
        return this.definitionProvider.find(
            (api) => api.name == this.plugin.settings.apiSettings[lang].definitionApiName
        );
    }

    /**
     * @returns Returns the currently selected Synonym API
     */
    private getSynonymAPI(): SynonymProvider {
        const lang = this.plugin.settings.defaultLanguage;
        return this.synonymProvider.find(
            (api) => api.name == this.plugin.settings.apiSettings[lang].synonymApiName
        );
    }

    /**
     * @returns Returns the currently selected part of speech API
     */
    private getPartOfSpeechAPI(): PartOfSpeechProvider | null {
        return this.plugin.settings.advancedSynonymAnalysis
            ? this.partOfSpeechProvider.find((api) => api.name == this.plugin.settings.partOfSpeechApiName)
            : null;
    }
}
