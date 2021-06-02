import type { Synonym, SynonymProvider } from "src/integrations/types";

export class SynonymoSynonymAPI implements SynonymProvider {
    //Yes this doesnt use https
    //We need a Proxy to add cors headers
    API_END_POINT = "https://api.allorigins.win/get?url=" + encodeURIComponent('http://www.synonymo.fr/synonyme/');

    public name = "Synonymo";
    public url = "http://www.synonymo.fr/";
    public supportedLanguages: string[] = ["fr"];

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
        let result: Response;
        try {
            result = await fetch(this.constructRequest(query));
        } catch (error) {
            return Promise.reject(error);
        }
        if (result.status != 200) {
            return Promise.reject();
        }

        const parser = new DOMParser();

        const doc = parser.parseFromString(await result.text(), 'text/html');

        const x = doc.body.getElementsByClassName('\\"word\\"');

        console.log(doc);

        for(let i = 0; i < x.length; i++){
            synonyms.push({word: x.item(i).textContent});
        }
        
        return synonyms;
    }
}
