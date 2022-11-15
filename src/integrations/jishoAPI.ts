import { DefinitionProvider, DictionaryWord } from "src/integrations/types";

class Base {
    name = "Jisho";
    base_url = "https://jisho.org/api/v1/search/words?keyword=";
    API_END_POINT = "https://jisho.org/api/v1/search/words?keyword=";
    offline = false;
    supportedLanguages = ["ja"];

    static LANGUAGES = {
        ja: "Japanese",
    };
}

interface JishoDefinition {
    slug: string;
    is_common: boolean;
    tags: string[];
    jlpt: string[];
    japanese: {
        word: string;
        reading: string;
    }[];
    senses: {
        english_definitions: string[];
        parts_of_speech: string[];
    }[];
}

export class JishoDefinitionProvider
    extends Base
    implements DefinitionProvider {
    requestDefinitions: (query: string, lang: string) => Promise<DictionaryWord> =
        async (query: string, lang: string) => {
            const result = await requestUrl({
                url: `${this.base_url}/search/words?keyword=${query}`,
            });

            const json = result.json;
            console.log(json);

            const data = json.data as JishoDefinition[];
            const word = data.first();

            const definition: DictionaryWord = {
                word: word.japanese[0].word,
                meanings: word.senses.map((eng) => ({
                    partOfSpeech: eng.parts_of_speech.join("\n"),
                    definitions: eng.english_definitions.map((def) => ({
                        definition: def,
                    })),
                })),
                phonetics: [
                    ...new Set(
                        word.japanese.map(
                            (japanese_word) =>
                                `${japanese_word.word} 「${japanese_word.reading}」`
                        )
                    ),
                ].map((unique) => ({
                    text: unique,
                })),
            };

            return definition;
        };
}
