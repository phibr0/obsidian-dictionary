import type{ PartOfSpeech, Synonym, SynonymProvider } from "src/integrations/types";

export class AltervistaSynonymProvider implements SynonymProvider {
    name = "Altervista";
    url = "http://thesaurus.altervista.org/";
    //Look up more later
    supportedLanguages: string[] = [
        "es",
        "it",
        "fr",
        "de",
    ];

    languageCodes = {
        "es": "es_ES",
        "it": "it_IT",
        "fr": "fr_FR",
        "de": "de_DE",
    }

    //This is limited to 5000 queries/day
    TOKEN = "P4QAmqYIN1DY6XjlQJht"
    API_END_POINT = "https://api.allorigins.win/get?url=" + encodeURIComponent('http://thesaurus.altervista.org/thesaurus/v1');

    async requestSynonyms(query: string, lang: string, _?: PartOfSpeech): Promise<Synonym[]> {
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

        for(const c of JSON.parse(json.contents).response){
            const words = c.list.synonyms.split('|');
            words.forEach((word: string) => {
                synonyms.push({word: word});
            });
        }

        return synonyms;
    }

    constructRequest(query: string, lang: string): string {
        return this.API_END_POINT + encodeURIComponent("?word=" + query + "&key=" + this.TOKEN + "&language=" + this.languageCodes[lang] + "&output=json");
    }

}