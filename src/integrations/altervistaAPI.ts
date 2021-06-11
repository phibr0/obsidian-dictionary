import type { PartOfSpeech, Synonym, SynonymProvider } from "src/integrations/types";

export class AltervistaSynonymProvider implements SynonymProvider {
    name: string = "Altervista";
    url: string = "http://thesaurus.altervista.org/";
    //Look up more later
    supportedLanguages: string[] = [
        "es",
    ];

    //This is limited to 5000 queries/day
    TOKEN = "P4QAmqYIN1DY6XjlQJht"
    API_END_POINT = "https://api.allorigins.win/get?url=" + encodeURIComponent('http://thesaurus.altervista.org/thesaurus/v1');

    async requestSynonyms(query: string, lang: string, pos?: PartOfSpeech): Promise<Synonym[]> {
        const synonyms: Synonym[] = [];
        let result: Response;
        try {
            result = await fetch(this.constructRequest(query, lang));
        } catch (error) {
            return Promise.reject(error);
        }
        if (result.status != 200) {
            return Promise.reject();
        }

        const json = await result.json();

        
        
        
        return synonyms;
    }

    constructRequest(query: string, lang: string): string{
        return this.API_END_POINT+"?word="+query+"&language="+lang+"&key="+this.TOKEN+"&output=json";
    }

}