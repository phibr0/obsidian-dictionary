import { request } from "obsidian";
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

    async requestSynonyms(query: string, lang: string, _?: PartOfSpeech): Promise<Synonym[]> {
        const synonyms: Synonym[] = [];
        let result: string;
        try {
            result = await request({url: this.constructRequest(query, lang)});
        } catch (error) {
            return Promise.reject(error);
        }

        const json = await JSON.parse(result);

        for(const c of json.response){
            const words = c.list.synonyms.split('|');
            words.forEach((word: string) => {
                synonyms.push({word: word});
            });
        }

        return synonyms;
    }

    constructRequest(query: string, lang: string): string {
        return `http://thesaurus.altervista.org/thesaurus/v1?word=${query}&key=${this.TOKEN}&language=${this.languageCodes[lang]}&output=json`;
    }

}