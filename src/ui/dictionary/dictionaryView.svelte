<script lang="ts">
  import Dictionary from "../../api/dictionary";
  import type { DictionarySettings } from "src/settings";
  import type { DictionaryWord } from "src/api/types";
  import PhoneticComponent from "./phoneticComponent.svelte";
  import MeaningComponent from "./meaningComponent.svelte";
  import ErrorComponent from "./errorComponent.svelte"

  export let settings: DictionarySettings;

  let dictionary = new Dictionary(settings);
  let query: string = "";
  let promise: Promise<DictionaryWord>;

  function handleClick() {
    if (query.trim() != "") {
      promise = dictionary.sendRequest(query, false);
    }
  }

  function handleBlur() {
    if (query.trim() != "") {
      promise = dictionary.sendRequest(query);
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
      on:blur={handleBlur}
    />
    <button on:click={handleClick}><i class="gg-search" /></button>
  </div>
  <div class="results">
    {#if query.trim() != "" && promise}
      {#await promise}
        <p>loading..</p>
      {:then data}
        <div class="container">
          <h3>Pronunciation</h3>
          {#each data.phonetics as { text, audio }}
            <PhoneticComponent {audio} {text} />
          {/each}
        </div>
        <div class="container">
          <h3>Meanings</h3>
          {#each data.meanings as { definitions, partOfSpeech }}
            <MeaningComponent {partOfSpeech} {definitions} />
          {/each}
        </div>
      {:catch error}
        <ErrorComponent {error}/>
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
</style>
