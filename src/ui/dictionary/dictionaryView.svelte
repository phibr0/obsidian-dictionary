<script lang="ts">
  import type APIManager from "src/apiManager";
  import type { DictionaryWord } from "src/integrations/types";
  import type LocalDictionaryBuilder from "src/localDictionaryBuilder";

  import PhoneticComponent from "./phoneticComponent.svelte";
  import MeaningComponent from "./meaningComponent.svelte";
  import ErrorComponent from "./errorComponent.svelte";
  import OriginComponent from "./originComponent.svelte";
  import t from "src/l10n/helpers";

  export let manager: APIManager;
  export let localDictionary: LocalDictionaryBuilder;

  export let query: string = "";
  let promise: Promise<DictionaryWord>;

  function search() {
    if (query.trim()) {
      promise = manager.requestDefinitions(query);
    }
  }

  function languageModal() {
    dispatchEvent(new Event("dictionary-open-language-switcher"));
  }

  addEventListener("obsidian-dictionary-plugin-search", () => {
    search();
  });

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      search();
    }
  }
</script>

<div class="main">
  <div class="searchbox">
    <button class="dictionary-button" on:click={languageModal}
      ><i class="languageIcon" alt="Language" /></button
    >
    <input
      type="text"
      spellcheck="true"
      placeholder={t("Enter a word")}
      bind:value={query}
      on:keydown={handleKeyDown}
    />
    <button class="dictionary-button" on:click={search}
      ><i class="searchIcon" alt="Search" /></button
    >
  </div>
  {#if promise && query.trim()}
    {#await promise}
      <div class="center">
        <div class="spinner" />
      </div>
    {:then data}
      {#if query === data.word}
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
                <OriginComponent {data}/>
            </div>
          {/if}
        </div>
        <span
          class="nn"
          on:click={async () => await localDictionary.newNote(data)}
          >{t("New Note")}</span
        >
      {/if}
    {:catch error}
      <ErrorComponent {error} />
    {/await}
  {/if}
</div>

<style lang="scss">
  .results {
    display: flex;
    flex-wrap: wrap;
  }

  .nn {
    color: var(--text-faint);
    transition: 0.2s;
    width: 100%;
    display: inline-block;
    text-align: center;
    margin-top: 1.5rem;
    font-size: 1em;
    &:hover {
      color: var(--text);
    }
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

  .searchbox {
    margin-top: 0.1rem;
    display: flex;

    > input {
      width: 100%;
      margin-right: 0.8rem;
      margin-left: 0.8rem;
    }
  }

  .dictionary-button {
    margin-right: 0px;
  }

  .searchIcon {
    box-sizing: border-box;
    position: relative;
    display: block;
    transform: scale(var(--ggs, 1));
    width: 16px;
    height: 16px;
    border: 2px solid;
    border-radius: 100%;
    margin-left: -4px;
    margin-top: -4px;
  }
  .searchIcon::after {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute;
    border-radius: 3px;
    width: 2px;
    height: 8px;
    background: currentColor;
    transform: rotate(-45deg);
    top: 10px;
    left: 12px;
  }

  .languageIcon,
  .languageIcon::after,
  .languageIcon::before {
    display: block;
    box-sizing: border-box;
    height: 18px;
    border: 2px solid;
  }
  .languageIcon {
    position: relative;
    transform: scale(var(--ggs, 1));
    width: 18px;
    border-radius: 22px;
  }
  .languageIcon::after,
  .languageIcon::before {
    content: "";
    position: absolute;
    width: 8px;
    border-radius: 100%;
    top: -2px;
    left: 3px;
  }
  .languageIcon::after {
    width: 24px;
    height: 20px;
    border: 2px solid transparent;
    border-bottom: 2px solid;
    top: -11px;
    left: -5px;
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
