import { request } from 'obsidian';
import type { Synonym, SynonymProvider } from "src/integrations/types";

export class SynonymoSynonymAPI implements SynonymProvider {

    public name = "Synonymo";
    public url = "http://www.synonymo.fr/";
    public supportedLanguages: string[] = ["fr"];

    API_END_POINT = 'http://www.synonymo.fr/synonyme/';

    /**
     * @param query - The term you want to look up
     * @returns Returns the URL in REST schema
     */
    constructRequest(query: string): string {
        return this.API_END_POINT + query;
        //SCHEMA: http://www.synonymo.fr/synonyme/<QUERY>
    }

    async requestSynonyms(query: string): Promise<Synonym[]> {
        const synonyms: Synonym[] = [];
        let result: string;
        try {
            result = await request({url: this.constructRequest(query)});
        } catch (error) {
            return Promise.reject(error);
        }

        const parser = new DOMParser();

        const doc = parser.parseFromString(result, 'text/html');

        const x = doc.body.getElementsByClassName("fiche").item(0).getElementsByClassName("word");

        for(let i = 0; i < x.length; i++){
            synonyms.push({word: x.item(i).textContent});
        }
        
        return synonyms;
    }
}
