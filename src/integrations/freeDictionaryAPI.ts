import { request } from 'obsidian';
import { DefinitionProvider, DictionaryWord, Meaning, PartOfSpeech, Synonym, SynonymProvider } from "src/integrations/types";

abstract class Base {
    API_END_POINT = "https://api.dictionaryapi.dev/api/v2/entries/";

    public name = "Free Dictionary API";
    public url = "https://dictionaryapi.dev/";
    offline = false;

    languageCodes = {
        "en_US": "en_US",
        "hi": "hi",
        "es": "es",
        "fr": "fr",
        "ja": "ja",
        "ru": "ru",
        "en_GB": "en_GB",
        "de": "de",
        "it": "it",
        "ko": "ko",
        "pt_BR": "pt-BR",
        "ar": "ar",
        "tr": "tr",
    }

    /**
     * @param query - The term you want to look up
     * @returns Returns the URL in REST schema
     */
    protected constructRequest(query: string, lang: string): string {
        return this.API_END_POINT + lang + '/' + query;
        //SCHEMA: https://api.dictionaryapi.dev/api/v2/entries/<language_code>/<word>
    }
}

export class FreeDictionaryDefinitionProvider extends Base implements DefinitionProvider {
    public supportedLanguages: string[] = [
        "en_US",
        // "hi",
        // "es",
        // "fr",
        // "ja",
        // "ru",
        "en_GB",
        // "de",
        // "it",
        // "ko",
        // "pt_BR",
        // "ar",
        // "tr",
    ];

    /**
     * Sends a request with the passed query to the End Point and returns the Result
     *
     * @param query - The term you want to look up
     * @param lang - The language to use
     * @param _ - For now unused parameter, debouncing mechanism planned
     * @returns The API Response of the API as Promise<DictionaryWord>
     */
    async requestDefinitions(query: string, lang: string, _ = true): Promise<DictionaryWord> {
        let result: string;
        try {
            const url = this.constructRequest(encodeURIComponent(query), this.languageCodes[lang]);
            result = await request({url});
        } catch (error) {
            return Promise.reject(error);
        }

        const json = (await JSON.parse(result) as DictionaryWord[]);

        if(!json || json["title"]){
            return Promise.reject(json["title"]);
        }

        return json.first();
    }
}

export class FreeDictionarySynonymProvider extends Base implements SynonymProvider {
    public supportedLanguages: string[] = [
        "en_US",
    ];

    /**
     * @param meaning - The Meaning to compare the POS to
     * @param pos - The part of speech of the target word
     * @returns True if the meaning is the same part of speech as pos
     */
    getDoesPosMatch(meaning: Meaning, pos: PartOfSpeech): boolean {
        switch (pos) {
        case PartOfSpeech.Noun:
            return meaning.partOfSpeech.toLowerCase().contains('noun');
        case PartOfSpeech.Verb:
            return meaning.partOfSpeech.toLowerCase().contains('verb');
        case PartOfSpeech.Adjective:
            return meaning.partOfSpeech.toLowerCase().contains('adjective');
        case PartOfSpeech.Adverb:
            return meaning.partOfSpeech.toLowerCase().contains('adverb');
        }
    }

    /**
     *
     * @param query - The word to look up synonyms for
     * @param lang - The host language
     * @param pos - The part of speech of the target word
     * @returns A list of Synonyms
     */
    async requestSynonyms(query: string, lang: string, pos?: PartOfSpeech): Promise<Synonym[]> {
        let result: string;
        try {
            result = await request({url: this.constructRequest(query, this.languageCodes[lang])});
        } catch (error) {
            return Promise.reject(error);
        }
        
        if(!result){
            return Promise.reject("Word doesnt exist in this Dictionary");
        }

        const meanings: Meaning[] = (await JSON.parse(result) as DictionaryWord[]).first().meanings;
        const synonyms: Synonym[] = [];

        // The default POS provider seems pretty wonky at the moment,
        // so let's include non-matches in the results as well
        const nonPOSMatch: Synonym[] = [];

        meanings.forEach(meaning => {
            if (Number.isNumber(pos) && !this.getDoesPosMatch(meaning, pos)) {
                meaning.definitions.forEach(def => {
                    if (def.synonyms) {
                        def.synonyms.forEach(synonym => {
                            nonPOSMatch.push({
                                word: synonym,
                            })
                        })
                    }
                })
                return;
            }

            meaning.definitions.forEach(def => {
                if (def.synonyms) {
                    def.synonyms.forEach(synonym => {
                        synonyms.push({
                            word: synonym,
                        })
                    })
                }
            })
        })

        return synonyms.concat(nonPOSMatch);
    }
}
