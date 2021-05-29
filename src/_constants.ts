import type DictionarySettings from "src/types";

export const VIEW_TYPE = 'dictionary-view';
export const VIEW_DISPLAY_TEXT = 'Dictionary';
export const VIEW_ICON = 'quote-glyph';

export const DEFAULT_SETTINGS: DictionarySettings = {
	defaultLanguage: "en_US",
	shouldShowSynonymPopover: true,
	shouldShowCustomContextMenu: true,
	definitionApiName: "Free Dictionary API",
	synonymApiName: "Free Dictionary API",
	partOfSpeechApiName: "Systran API",
	advancedSynonymAnalysis: false
}

export const LANGUAGES = {
	"en_US": "English (US)",
	"hi": "Hindi",
	"es": "Spanish",
	"fr": "French",
	"ja": "Japanese",
	"ru": "Russian",
	"en_GB": "English (UK)",
	"de": "German",
	"it": "Italian",
	"ko": "Korean",
	"pt-BR": "Brazilian Portuguese",
	"ar": "Arabic",
	"tr": "Turkish",
	"ch": "Chinese"
	
}
