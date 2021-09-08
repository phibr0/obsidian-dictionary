<script lang="ts">
  import type APIManager from "src/apiManager";
  import type { DictionaryWord } from "src/integrations/types";
  import type LocalDictionaryBuilder from "src/localDictionaryBuilder";

  import PhoneticComponent from "./phoneticComponent.svelte";
  import MeaningComponent from "./meaningComponent.svelte";
  import ErrorComponent from "./errorComponent.svelte";
  import OriginComponent from "./originComponent.svelte";
  import t from "src/l10n/helpers";
  import { debounce, setIcon } from "obsidian";

  export let manager: APIManager;
  export let localDictionary: LocalDictionaryBuilder;

  export let query: string = "";
  let lastQuery: string = null;
  let promise: Promise<DictionaryWord>;

  setImmediate(() => {
    setIcon(document.getElementById("languageModal"), "languages", 20);
    setIcon(document.getElementById("apiModal"), "cloud", 20);
    setIcon(document.getElementById("openAndCloseAll"), "bullet-list", 20);
    setIcon(document.getElementById("localDictionaryBuilder"), "documents", 20);
    setIcon(
      document.getElementById("matchCaseBtn"),
      "uppercase-lowercase-a",
      20
    );
  });

  const debouncedSearch = debounce(search, 800, true);

  let matchCase = true;
  function search() {
    if (query.trim()) {
      lastQuery = query;
      promise = manager.requestDefinitions(
        matchCase ? query : query.toLowerCase()
      );
    }
  }

  function languageModal() {
    dispatchEvent(new Event("dictionary-open-language-switcher"));
  }

  function apiModal() {
    dispatchEvent(new Event("dictionary-open-api-switcher"));
  }

  let detailsOpen = false;
  function toggleContainer() {
    if (detailsOpen) {
      dispatchEvent(new Event("dictionary-close-all"));
      detailsOpen = false;
    } else {
      dispatchEvent(new Event("dictionary-open-all"));
      detailsOpen = true;
    }
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      search();
    }
  }

  function clear() {
    query = "";
    lastQuery = null;
    promise = null;
    //@ts-ignore
    document.querySelector("#dictionary-search-input").focus();
  }

  addEventListener("obsidian-dictionary-plugin-search", () => {
    search();
  });
</script>

<div class="nav-buttons-container">
  <div
    id="languageModal"
    class="nav-action-button"
    aria-label={t("Change Language")}
    on:click={languageModal}
  />
  <div
    id="apiModal"
    class="nav-action-button"
    aria-label={t("Change Provider")}
    on:click={apiModal}
  />
  <div
    id="openAndCloseAll"
    class="nav-action-button"
    class:is-active={detailsOpen}
    aria-label={t("Collapse Results")}
    on:click={toggleContainer}
  />
  <div
    id="matchCaseBtn"
    class="nav-action-button"
    class:is-active={matchCase}
    aria-label={t("Match Case")}
    on:click={() => (matchCase = !matchCase)}
  />
  <div
    id="localDictionaryBuilder"
    class="nav-action-button"
    aria-label={t("New Note")}
    on:click={async () =>
      promise && query.trim() && (await localDictionary.newNote(await promise))}
  />
</div>
<div class="search-input-container">
  <input
    id="dictionary-search-input"
    type="text"
    spellcheck="true"
    placeholder={t("Enter a word")}
    bind:value={query}
    on:keydown={handleKeyDown}
    on:keydown={debouncedSearch}
  />
  {#if query}
    <div class="search-input-clear-button" on:click={clear} aria-label={t("Clear")} />
  {/if}
</div>
<div class="contents">
  {#if promise && query === lastQuery}
    {#await promise}
      <div class="center">
        <div class="spinner" />
      </div>
    {:then data}
      <div class="results">
        {#if data.phonetics.first().text}
          <div class="container">
            <h3>{t("Pronunciation")}</h3>
            {#each data.phonetics as { text, audio }}
              <PhoneticComponent {audio} {text} />
            {/each}
          </div>
        {/if}
        <div class="container">
          <h3>{t("Meanings")}</h3>
          {#each data.meanings as { definitions, partOfSpeech }}
            <MeaningComponent word={data.word} {partOfSpeech} {definitions} />
          {/each}
        </div>
        {#if data.origin}
          <div class="container">
            <h3>{t("Origin")}</h3>
            <OriginComponent {data} />
          </div>
        {/if}
      </div>
    {:catch error}
      <ErrorComponent {error} />
    {/await}
  {:else if query.trim()}
    <div class="center">
      <div class="spinner" />
    </div>
  {/if}
</div>

<style lang="scss">
  .contents {
    height: 80%;
    overflow-y: auto;
  }
  .settings {
    display: flex;
    flex-flow: row;
    justify-content: center;
  }
  .results {
    display: flex;
    flex-wrap: wrap;
  }

  .container {
    max-width: 30vw;
    width: 100%;
    margin: auto;
    background-color: var(--background-primary-alt);
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
    margin-top: 0.5rem;
    border-radius: 0.3rem;
    > h3 {
      margin-top: 0.3rem;
      margin-bottom: 0.3rem;
      font-weight: normal;
    }
  }

  .search-bar-container {
    margin-top: 0.1rem;
    margin-bottom: 0.8rem;
    display: flex;
    > input {
      width: 100%;
    }
  }

  .center {
    margin: auto;
    width: 100%;
    margin-top: 2rem;
  }

  @keyframes spinner {
    0% {
      transform: translate3d(-50%, -50%, 0) rotate(0deg);
    }
    100% {
      transform: translate3d(-50%, -50%, 0) rotate(360deg);
    }
  }

  .spinner {
    // The height here is just for demo purposes
    height: 3rem;
    opacity: 1;
    position: relative;
    transition: opacity linear 0.1s;
    &::before {
      animation: 2s linear infinite spinner;
      border: solid 3px var(--background-modifier-border);
      border-bottom-color: var(--interactive-accent);
      border-radius: 50%;
      content: "";
      height: 40px;
      left: 50%;
      opacity: inherit;
      position: absolute;
      top: 50%;
      transform: translate3d(-50%, -50%, 0);
      transform-origin: center;
      width: 40px;
      will-change: transform;
    }
  }
</style>
