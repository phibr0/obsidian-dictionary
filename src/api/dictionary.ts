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

    async sendRequest(query: string, _ = true): Promise<DictionaryWord> {
        let result;
        try {
            result = await fetch(this.constructRequest(query));
        } catch (error) {
            return Promise.reject(error);
        }

        return await Convert.toDictionaryWord(await result.text()).first();
    }

    private constructRequest(query: string): string {
        return API_END_POINT + this.getLanguageCode() + '/' + query;
        //SCHEMA: https://api.dictionaryapi.dev/api/v2/entries/<language_code>/<word>
    }

    //TODO Get Language from Word Context first
    private getLanguageCode(): string {
        return LANGUAGES[this.settings.defaultLanguage];
    }

}