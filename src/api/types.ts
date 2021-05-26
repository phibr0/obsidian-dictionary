interface Provider {
    name: string;
    url: string;
}
export interface DefinitionProvider extends Provider {
    requestDefinitions(query: string, lang: string): Promise<DictionaryWord>;
    supportedLanguages: string[];
}

export interface SynonymProvider extends Provider {
    requestSynonyms(query: string, lang: string, pos?: PartOfSpeech): Promise<Synonym[]>;
    supportedLanguages: string[];
}

export interface PartOfSpeechProvider extends Provider {
    requestPartOfSpeech(word: string, leftContext: string, rightContext: string, lang: string): Promise<PartOfSpeech>;
    supportedLanguages: string[];
}

export enum PartOfSpeech {
    Noun,
    Verb,
    Adjective,
    Adverb,
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

export interface Synonym {
    word: string;
    partsOfSpeech?: string[];
    description?: string;
}

export interface Phonetic {
    text: string;
    audio?: string;
}