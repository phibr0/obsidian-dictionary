import type { DefinitionProvider, DictionaryWord, SynonymProvider } from "src/api/types";
import type DictionarySettings from "src/types";

import FreeDictionaryAPI from "src/api/freeDictionaryAPI"

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
    private settings: DictionarySettings

    // Adds new API's to the Definition Providers
    definitionProvider: DefinitionProvider[] = [
        new FreeDictionaryAPI(),
    ];
    // Adds new API's to the Synonym Providers
    synonymProvider: SynonymProvider[] = [
        new FreeDictionaryAPI(),
    ];

    constructor(settings: DictionarySettings) {
        this.settings = settings;
    }

    /**
     * Sends a request with the passed query to the chosen API and returns the Result
     *
     * @param query - The term you want to look up
     * @param lang - The Language the Api will use
     * @returns The API Response of the chosen API as Promise<DictionaryWord>
     */
    async requestDefinitions(query: string): Promise<DictionaryWord> {
        return await this.getDefinitionAPI().requestDefinitions(query, this.settings.defaultLanguage);
    }

    /**
     * Sends a request with the passed query to the chosen API and returns the resulting Synonyms
     *
     * @param query - The term you want to look up
     * @param lang - The Language the API will use
     * @returns The API Response of the chosen API as Promise<string[]>
     */
    async requestSynonyms(query: string): Promise<string[]> {
        return await this.getSynonymAPI().requestSynonyms(query, this.settings.defaultLanguage);
    }

    /**
     * @returns Returns the currently active Definition API
     */
    private getDefinitionAPI() {
        return this.definitionProvider.find(api => api.name == this.settings.definitionApiName);
    }

    /**
     * @returns Returns the currently active Synonym API
     */
    private getSynonymAPI() {
        return this.synonymProvider.find(api => api.name == this.settings.synonymApiName);
    }
}