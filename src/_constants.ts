import type { DictionarySettings } from "src/types";
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
    "tr": "Türkçe (Turkish)"
}

export const DEFAULT_SETTINGS: DictionarySettings = {
    defaultLanguage: "en_US",
    shouldShowSynonymPopover: true,
    shouldShowCustomContextMenu: false,
    definitionApiName: "Free Dictionary API",
    synonymApiName: "Free Dictionary API",
    partOfSpeechApiName: "Systran API",
    advancedSynonymAnalysis: false,
    useCaching: false,
    cachedDefinitions: [],
    cachedSynonyms: [],
    folder: '',
    capitalizedFileName: true,
    prefix: "",
    suffix: " {{lang}}",
    template: `---
# {{notice}}
word: "{{word}}"
---

# {{word}}

## {{pronunciationHeader}}

{{phoneticList}}

## {{meaningHeader}}

{{meanings}}
`
}

