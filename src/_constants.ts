import type { DictionaryCache, DictionarySettings } from "src/types";
import t from 'src/l10n/helpers';

export const VIEW_TYPE = 'dictionary-view';
export const VIEW_DISPLAY_TEXT = t('Dictionary');
export const VIEW_ICON = 'quote-glyph';

export const LANGUAGES = {
    "en_US": "English (US)",
    "hi": "हिन्दी (Hindi)",
    "es": "Español (Spanish)",
    "fr": "Français (French)",
    "ja": "日本語 (Japanese)",
    "ru": "Русский (Russian)",
    "en_GB": "English (UK)",
    "de": "Deutsch (German)",
    "it": "Italiano (Italian)",
    "ko": "한국어 (Korean)",
    "pt_BR": "Português do Brasil (Brazilian Portuguese)",
    "ar": "اَلْعَرَبِيَّةُ‎ (Arabic)",
    "tr": "Türkçe (Turkish)",
    "cn": "中文 (Chinese)"
}

export const RFC = {
    "en_US": "en-US",
    "hi": "hi",
    "es": "es",
    "fr": "fr",
    "ja": "ja",
    "ru": "ru",
    "en_GB": "en-GB",
    "de": "de",
    "it": "it",
    "ko": "ko",
    "pt_BR": "pt-BR",
    "ar": "ar",
    "tr": "tr",
    "cn": "zh"
}


export const DEFAULT_CACHE: DictionaryCache = {
    cachedDefinitions: [],
    cachedSynonyms: [],
}

export const DEFAULT_SETTINGS: DictionarySettings = {
    getLangFromFile: true,
    defaultLanguage: "en_US",
    normalLang: 'en_US',
    shouldShowSynonymPopover: true,
    shouldShowCustomContextMenu: false,
    apiSettings: {
        en_US: {
            definitionApiName: 'Free Dictionary API',
            synonymApiName: 'Free Dictionary API',
        },
        hi: {
            definitionApiName: 'Free Dictionary API',
            synonymApiName: null,
        },
        es: {
            definitionApiName: 'Free Dictionary API',
            synonymApiName: 'Altervista',
        },
        fr: {
            definitionApiName: 'Free Dictionary API',
            synonymApiName: 'Altervista',
        },
        ja: {
            definitionApiName: 'Free Dictionary API',
            synonymApiName: null,
        },
        ru: {
            definitionApiName: 'Free Dictionary API',
            synonymApiName: null,
        },
        en_GB: {
            definitionApiName: 'Free Dictionary API',
            synonymApiName: null,
        },
        de: {
            definitionApiName: 'Free Dictionary API',
            synonymApiName: 'Open Thesaurus',
        },
        it: {
            definitionApiName: 'Free Dictionary API',
            synonymApiName: 'Altervista',
        },
        ko: {
            definitionApiName: 'Free Dictionary API',
            synonymApiName: null,
        },
        pt_BR: {
            definitionApiName: 'Free Dictionary API',
            synonymApiName: null,
        },
        ar: {
            definitionApiName: 'Free Dictionary API',
            synonymApiName: null,
        },
        tr: {
            definitionApiName: 'Free Dictionary API',
            synonymApiName: null,
        },
        cn: {
            definitionApiName: 'Offline Dictionary',
            synonymApiName: null,
        },
    },
    partOfSpeechApiName: "Systran API",
    advancedSynonymAnalysis: false,
    useCaching: false,
    folder: '',
    capitalizedFileName: true,
    prefix: "",
    suffix: " ({{lang}})",
    template: `---
# {{notice}}
aliases: ["{{word}}"]
---

# {{word}}

## {{pronunciationHeader}}

{{phoneticList}}

## {{meaningHeader}}

{{meanings}}
`,
    languageSpecificSubFolders: false
}

