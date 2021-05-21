interface Provider {
    name: string;
}
export interface DefinitionProvider extends Provider {
    requestDefinitions: { (query: string, lang: string): Promise<DictionaryWord> };
    supportedLanguagesD: string[];
}

export interface SynonymProvider extends Provider {
    name: string;
    requestSynonyms: { (query: string, lang: string): Promise<string[]> };
    supportedLanguagesS: string[];
}

export interface DictionaryWord {
    word: string;
    phonetics: Phonetic[];
    meanings: Meaning[];
}

export interface Meaning {
    partOfSpeech: string;
    definitions: Definition[];
}

export interface Definition {
    definition: string;
    example?: string;
    synonyms?: string[];
}

export interface Phonetic {
    text: string;
    audio?: string;
}