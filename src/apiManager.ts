import type { DefinitionProvider, DictionaryWord, SynonymProvider } from "src/api/types";
import type { DictionarySettings } from "src/settings";

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

    definitionProvider: DefinitionProvider[] = [];
    synonymProvider: SynonymProvider[] = [];

    constructor(settings: DictionarySettings) {
        this.settings = settings;
        this.definitionProvider.push(
            new FreeDictionaryAPI(this.settings),
        );
        this.synonymProvider.push(
            new FreeDictionaryAPI(this.settings),
        )
    }

    /**
     * Sends a request with the passed query to the chosen API and returns the Result
     *
     * @param query - The term you want to look up
     * @returns The API Response of the chosen API as Promise<DictionaryWord>
     */
    async requestDefinitions(query: string): Promise<DictionaryWord> {
        return await this.getDefinitionAPI().requestDefinitions(query);
    }

    /**
     * Sends a request with the passed query to the chosen API and returns the resulting Synonyms
     *
     * @param query - The term you want to look up
     * @returns The API Response of the chosen API as Promise<string[]>
     */
    async requestSynonyms(query: string): Promise<string[]> {
        return await this.getSynonymAPI().requestSynonyms(query);
    }

    private getDefinitionAPI() {
        return this.definitionProvider.find(api => api.name == this.settings.definitionApiName);
    }

    private getSynonymAPI() {
        return this.synonymProvider.find(api => api.name == this.settings.synonymApiName);
    }
}