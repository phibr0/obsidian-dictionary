import type { DictionarySettings } from "src/settings";

export const VIEW_TYPE = 'dictionary-view';
export const VIEW_DISPLAY_TEXT = 'Dictionary';
export const VIEW_ICON = 'languages';

export const DEFAULT_SETTINGS: DictionarySettings = {
	defaultLanguage: "English (US)"
}

export const API_END_POINT = "https://api.dictionaryapi.dev/api/v2/entries/"

export const LANGUAGES = {
	"English (US)": "en_US",
	"Hindi": "hi",
	"Spanish": "es",
	"French": "fr",
	"Japanese": "ja",
	"Russian": "ru",
	"English (UK)": "en_GB",
	"German": "de",
	"Italian": "it",
	"Korean": "ko",
	"Brazilian Portuguese": "pt-BR",
	"Arabic": "ar",
	"Turkish": "tr"
}