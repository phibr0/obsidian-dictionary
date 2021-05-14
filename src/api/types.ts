// To parse this data:
//
//   import { Convert } from "./file";
//
//   const dictionaryWord = Convert.toDictionaryWord(json);

export interface DictionaryWord {
    word:      string;
    phonetics: Phonetic[];
    meanings:  Meaning[];
}

export interface Meaning {
    partOfSpeech: string;
    definitions:  Definition[];
}

export interface Definition {
    definition: string;
    example?:   string;
    synonyms?:  string[];
}

export interface Phonetic {
    text:   string;
    audio?: string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toDictionaryWord(json: string): DictionaryWord[] {
        return JSON.parse(json);
    }

    public static dictionaryWordToJson(value: DictionaryWord[]): string {
        return JSON.stringify(value);
    }
}
