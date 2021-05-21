import type { DefinitionProvider, DictionaryWord, Meaning, SynonymProvider } from "src/api/types";
import type { DictionarySettings } from "src/settings";

import { API_END_POINT, LANGUAGES } from "src/_constants";
import { debounce } from "obsidian";

export default class FreeDictionaryAPI implements DefinitionProvider, SynonymProvider {

    settings: DictionarySettings;

    public name: string = "Free Dictionary API";
    public supportedLanguagesD: string[] = [
        "English (US)",
        "Hindi",
        "Spanish",
        "French",
        "Japanese",
        "Russian",
        "English (UK)",
        "German",
        "Italian",
        "Korean",
        "Brazilian Portuguese",
        "Arabic",
        "Turkish",
    ];
    public supportedLanguagesS: string[] = [
        "English (US)",
    ];

    constructor(settings: DictionarySettings) {
        this.settings = settings;
    }

    async requestSynonyms(query: string): Promise<string[]> {
        let result: Response;
        try {
            result = await fetch(this.constructRequest(query));
        } catch (error) {
            return Promise.reject(error);
        }
        let synonyms: string[] = [];
        const meanings: Meaning[] = Convert.toDictionaryWord(await result.text()).first().meanings;
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
    async requestDefinitions(query: string, _ = true): Promise<DictionaryWord> {
        let result: Response;
        try {
            result = await fetch(this.constructRequest(query));
        } catch (error) {
            return Promise.reject(error);
        }
        return Convert.toDictionaryWord(await result.text()).first();
    }

    /**
     * @param query - The term you want to look up
     * @returns Returns the URL in REST schema
     */
    private constructRequest(query: string): string {
        return API_END_POINT + this.getLanguageCode() + '/' + query;
        //SCHEMA: https://api.dictionaryapi.dev/api/v2/entries/<language_code>/<word>
    }

    /**
     * @returns Returns the correct Language Code
     */
    private getLanguageCode(): string {
        //TODO Get Language from Word Context first
        return LANGUAGES[this.settings.defaultLanguage];
    }

}

class Convert {
    public static toDictionaryWord(json: string): DictionaryWord[] {
        return JSON.parse(json);
    }

    public static dictionaryWordToJson(value: DictionaryWord[]): string {
        return JSON.stringify(value);
    }
}
