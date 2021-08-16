import type { DictionaryWord, Synonym } from "src/integrations/types";

export interface DictionarySettings {
	defaultLanguage: string;
	definitionApiName: string;
	synonymApiName: string;
	partOfSpeechApiName: string;
	shouldShowSynonymPopover: boolean;
	shouldShowCustomContextMenu: boolean;
	advancedSynonymAnalysis: boolean;
	useCaching: boolean;
	folder: string;
	languageSpecificSubFolders: boolean,
	capitalizedFileName: boolean;
	suffix: string;
	prefix: string;
	template: string;
}

export interface DictionaryCache {
	cachedDefinitions: CachedDictionaryWord[];
	cachedSynonyms: CachedSynonymCollection[];
}

export interface CachedDictionaryWord {
	content: DictionaryWord;
	lang: string;
	api: string;
}

export interface CachedSynonymCollection {
	content: Synonym[];
	word: string;
	lang: string;
	api: string;
}