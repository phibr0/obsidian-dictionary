import type { DefinitionProvider, DictionaryWord, Meaning, SynonymProvider } from "src/api/types";
import type  DictionarySettings  from "src/types";

import { LANGUAGES } from "src/_constants";
import { debounce } from "obsidian";

export default class FreeDictionaryAPI implements DefinitionProvider, SynonymProvider {

    API_END_POINT: string = "https://api.dictionaryapi.dev/api/v2/entries/";

    public name: string = "Free Dictionary API";
    public supportedLanguagesD: string[] = [
        "en_US",
        "hi",
        "es",
        "fr",
        "ja",
        "ru",
        "en_GB",
        "de",
        "it",
        "ko",
        "pt-BR",
        "ar",
        "tr",
    ];
    public supportedLanguagesS: string[] = [
        "en_US",
    ];

    async requestSynonyms(query: string, lang: string): Promise<string[]> {
        let result: Response;
        try {
            result = await fetch(this.constructRequest(query, lang));
        } catch (error) {
            return Promise.reject(error);
        }
        let synonyms: string[] = [];
        const meanings: Meaning[] = (await result.json() as DictionaryWord[]).first().meanings;
        for (let i = 0; i < meanings.length; i++) {
            for (let y = 0; y < meanings[i].definitions.length; y++) {
                synonyms.push(...meanings[i].definitions[y]?.synonyms);
            }
        }
        return synonyms;
    }

    /**
     * Sends a request with the passed query to the End Point and returns the Result
     *
     * @param query - The term you want to look up
     * @param _ - For now unused parameter, debouncing mechanism planned
     * @returns The API Response of the API as Promise<DictionaryWord>
     */
    async requestDefinitions(query: string, lang: string, _ = true): Promise<DictionaryWord> {
        let result: Response;
        try {
            result = await fetch(this.constructRequest(query, lang));
        } catch (error) {
            return Promise.reject(error);
        }
        return (await result.json() as DictionaryWord[]).first();
    }

    /**
     * @param query - The term you want to look up
     * @returns Returns the URL in REST schema
     */
    private constructRequest(query: string, lang: string): string {
        return this.API_END_POINT + lang + '/' + query;
        //SCHEMA: https://api.dictionaryapi.dev/api/v2/entries/<language_code>/<word>
    }

}