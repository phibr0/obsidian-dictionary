export default interface DictionarySettings {
    defaultLanguage: string;
	definitionApiName: string;
	synonymApiName: string;
	partOfSpeechApiName: string;
	shouldShowSynonymPopover: boolean;
	shouldShowCustomContextMenu: boolean;
	advancedSynonymAnalysis: boolean;
	folder: string;
	capitalizedFileName: boolean;
	suffix: string;
	prefix: string;
	template: string;
}
