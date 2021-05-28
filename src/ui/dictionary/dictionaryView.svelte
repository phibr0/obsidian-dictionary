<script lang="ts">
  import type APIManager from "src/apiManager";
  import type { DictionaryWord } from "src/api/types";

  import PhoneticComponent from "./phoneticComponent.svelte";
  import MeaningComponent from "./meaningComponent.svelte";
  import ErrorComponent from "./errorComponent.svelte";

  export let manager: APIManager;

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
    if (e.key === 'Enter') {
      search();
    }
  }
</script>

<div class="main">
  <div class="searchbox">
    <input
      type="text"
      spellcheck="true"
      placeholder="Enter a word"
      bind:value={query}
      on:keydown={handleKeyDown}
    />
    <button on:click={search}><i class="gg-search" /></button>
  </div>
  <div class="results">
    {#if query.trim() != "" && promise}
      {#await promise}
          <div class="center">
            <div class="lds-ellipsis">
              <div />
              <div />
              <div />
              <div />
            </div>
          </div>
      {:then data}
        {#if data.phonetics.first().text}
          <div class="container">
            <h3>Pronunciation</h3>
            {#each data.phonetics as { text, audio }}
              <PhoneticComponent {audio} {text} />
            {/each}
          </div>
        {/if}
        <div class="container">
          <h3>Meanings</h3>
          {#each data.meanings as { definitions, partOfSpeech }}
            <MeaningComponent word={data.word} {partOfSpeech} {definitions} />
          {/each}
        </div>
      {:catch error}
        <ErrorComponent {error} />
      {/await}
    {/if}
  </div>
</div>

<style lang="scss">
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

  .center{
    margin: auto;
    width: 100%;
  }
  .lds-ellipsis {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-ellipsis div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: var(--text-muted);
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  .lds-ellipsis div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
  }
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }
</style>
