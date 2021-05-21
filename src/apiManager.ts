import type { DefinitionProvider, DictionaryWord, SynonymProvider } from "src/api/types";
import type { DictionarySettings } from "src/settings";

import FreeDictionaryAPI from "src/api/freeDictionaryAPI"

export default class APIManager {
    settings: DictionarySettings

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

    async requestDefinitions(query: string): Promise<DictionaryWord> {
        return await this.getDefinitionAPI().requestDefinitions(query);
    }

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