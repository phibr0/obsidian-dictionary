import type { Phonetic, Meaning, Definition } from './types';
import type APIManager from 'src/apiManager';
import { normalizePath, request } from 'obsidian';
import type { DefinitionProvider, DictionaryWord } from "src/integrations/types";

export class OfflineDictionary implements DefinitionProvider {
    public name = "Offline Dictionary";
    public url = "Offline, downloaded from GitHub Release on first use.";
    public supportedLanguages: string[] = ["en_US", "en_GB", "cn"];
    offlineDic: any;
    manager: APIManager;

    constructor(manager: APIManager) {
        this.manager = manager;
    }

    async requestDefinitions(query: string, lang: string): Promise<DictionaryWord> {
        const data = (await this.getOfflineDictionary())[query];
        if(!data){
            return Promise.reject("Word doesnt exist in Offline Dictionary");
        }
        const phonetics: Phonetic[] = [];
        data.readings.forEach(element => {
            phonetics.push({text: element});
        });
        const meanings: Meaning[]= [];
        data.defs.forEach(element => {
            const definition: Definition[] = [];
            definition.push({
                definition: lang === "cn" ? element.def_cn : element.def_en,
                example: lang === "cn" ? element.ext.first().ext_cn : element.ext.first().ext_en
            });
            meanings.push({
                partOfSpeech: lang === "cn" ? element.pos_cn : element.pos_en,
                definitions: definition
            });
        });
        const dictionaryWord: DictionaryWord = {
            word: query,
            phonetics: phonetics,
            meanings: meanings
        }
        return dictionaryWord;
    }

    async getOfflineDictionary(): Promise<any> {
        const { plugin } = this.manager;
        const { adapter } = plugin.app.vault;
        const path = normalizePath(`${plugin.manifest.dir}/offlineDictionary.json`);
        if (!this.offlineDic) {
            if (!await adapter.exists(path)) {
                const data = await request({ url: `https://github.com/phibr0/obsidian-dictionary/releases/download/${plugin.manifest.version}/dictionary.json` });
                await adapter.write(path, data);
            }
            this.offlineDic = JSON.parse(await adapter.read(path));
        }
        return this.offlineDic;
    }

}
