<script lang="ts">
  import type APIManager from "src/apiManager";
  import type { DictionaryWord } from "src/api/types";
  import type LocalDictionaryBuilder from "src/localDictionaryBuilder";

  import PhoneticComponent from "./phoneticComponent.svelte";
  import MeaningComponent from "./meaningComponent.svelte";
  import ErrorComponent from "./errorComponent.svelte";
  import t from "src/l10n/helpers";

  export let manager: APIManager;
  export let localDictionary: LocalDictionaryBuilder;

  export let query: string = "";
  let promise: Promise<DictionaryWord>;

  function search() {
    if (query.trim() !== "") {
      promise = manager.requestDefinitions(query);
    }
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
    <input
      type="text"
      spellcheck="true"
      placeholder={t('Enter a word')}
      bind:value={query}
      on:keydown={handleKeyDown}
    />
    <button on:click={search}><i class="gg-search" /></button>
  </div>
  <div class="results">
    {#if query.trim() != "" && promise}
      {#await promise}
        <div class="center">
          <div class="spinner" />
        </div>
      {:then data}
        {#if data.phonetics.first().text}
          <div class="container">
            <h3>{t('Pronunciation')}</h3>
            {#each data.phonetics as { text, audio }}
              <PhoneticComponent {audio} {text} />
            {/each}
          </div>
        {/if}
        <div class="container">
          <h3>{t('Meanings')}</h3>
          {#each data.meanings as { definitions, partOfSpeech }}
            <MeaningComponent word={data.word} {partOfSpeech} {definitions} />
          {/each}
        </div>
        <span
          class="nn"
          on:click={async () => await localDictionary.newNote(data)}
          >{t('New Note')}</span
        >
      {:catch error}
        <ErrorComponent {error} />
      {/await}
    {/if}
  </div>
</div>

<style lang="scss">
  .nn {
    color: var(--text-faint);
    transition: 0.2s;
    width: 100%;
    text-align: center;
    margin-top: 0.8rem;
    font-size: 1.1em;
    &:hover{
      color: var(--text);
    }
  }

  .searchbox {
    margin-top: 0.1rem;
    display: flex;

    > input {
      width: 100%;
      margin-right: 1rem;
      margin-left: 12px; //So its the same as the Button
    }
  }

  .results {
    display: flex;
    flex-wrap: wrap;
  }
  .container {
    width: 100%;
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

  .gg-search {
    box-sizing: border-box;
    position: relative;
    display: block;
    transform: scale(var(--ggs, 0.8));
    width: 16px;
    height: 16px;
    border: 2px solid;
    border-radius: 100%;
    margin-left: -4px;
    margin-top: -4px;

    &:after {
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
