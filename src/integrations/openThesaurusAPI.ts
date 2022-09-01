import { request } from 'obsidian';
import type { Synonym, SynonymProvider } from "src/integrations/types";

export class OpenThesaurusSynonymAPI implements SynonymProvider {
    API_END_POINT = "https://www.openthesaurus.de/synonyme/search?q=";

    public name = "OpenThesaurus";
    public url = "https://www.openthesaurus.de/";
    public supportedLanguages: string[] = ["de"];
    offline = false;

    /**
     * @param query - The term you want to look up
     * @returns Returns the URL in REST schema
     */
    constructRequest(query: string): string {
        return this.API_END_POINT + query + "&format=application/json";
        //SCHEMA: https://www.openthesaurus.de/synonyme/search?q=<QUERY>&format=application/json
    }

    async requestSynonyms(query: string): Promise<Synonym[]> {
        let result: string;
        try {
            result = await request({url: this.constructRequest(query)});
        } catch (error) {
            return Promise.reject(error);
        }

        if(!result){
            return Promise.reject("Word doesnt exist in this Dictionary");
        }

        const response = await JSON.parse(result);

        if(!response.synsets){
            return Promise.reject("Word doesnt exist in this Dictionary");
        }
        
        if (response.synsets.length <= 0) {
            return Promise.reject("No Synonym found");
        }
        const synonymList: Array<Record<string, string>> = response.synsets[0].terms;

        const synonyms: Synonym[] = [];
        synonymList.forEach((synonym) => {
            const word: string = synonym["term"];
            if (query != word) {
                synonyms.push({ word: word });
            }
        });
        return synonyms;
    }
}
