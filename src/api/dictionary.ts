import { API_END_POINT, LANGUAGES } from "src/_constants";
import type { DictionaryWord } from "src/api/types";
import type { DictionarySettings } from "src/settings";
import { Convert } from "./types"
import { debounce } from "obsidian";

export default class Dictionary {

    settings: DictionarySettings;

    constructor(settings: DictionarySettings) {
        this.settings = settings;
    }

    /**
     * Sends a request with the passed query to the End Point and returns the Result
     *
     * @param query - The term you want to look up
     * @param _ - For now unused parameter, debouncing mechanism planned
     * @returns The API Response of the API as Promise<DictionaryWord>
     */
    async sendRequest(query: string, _ = true): Promise<DictionaryWord> {
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