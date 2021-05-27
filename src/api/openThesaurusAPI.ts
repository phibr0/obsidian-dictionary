import type { PartOfSpeech, Synonym, SynonymProvider } from "src/api/types";

export class OpenThesaurusSynonymAPI implements SynonymProvider {
  API_END_POINT: string = "https://www.openthesaurus.de/synonyme/search?q=";

  public name: string = "OpenThesaurus";
  public url: string = "https://www.openthesaurus.de/";
  public supportedLanguages: string[] = ["de"];

  /**
   * @param query - The term you want to look up
   * @returns Returns the URL in REST schema
   */
  constructRequest(query: string): string {
    return this.API_END_POINT + query + "&format=application/json";
    //SCHEMA: https://www.openthesaurus.de/synonyme/search?q=<QUERY>&format=application/json
  }

  async requestSynonyms(
    query: string,
    lang: string,
    pos?: PartOfSpeech
  ): Promise<Synonym[]> {
    let result: Response;
    try {
      result = await fetch(this.constructRequest(query));
    } catch (error) {
      return Promise.reject(error);
    }
    if (result.status != 200) {
      return Promise.reject();
    }

    const response = await result.json();
    if (response.synsets.length <= 0) {
      return Promise.reject();
    }
    const synonymList: Array<Object> = response.synsets[0].terms;

    const synonyms: Synonym[] = [];
    synonymList.forEach((synonym) => {
      synonyms.push({ word: synonym["term"] });
    });
    return synonyms;
  }
}
