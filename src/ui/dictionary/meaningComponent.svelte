<script lang="ts">
  import t from "src/l10n/helpers";
  import type { Definition } from "src/integrations/types";
  import { copy } from "src/util";
  import { Notice } from "obsidian";
  import { slide } from "svelte/transition";

  export let word: string;
  export let definitions: Definition[];
  export let partOfSpeech: string;
  let open = false;

  addEventListener("dictionary-collapse", (event: CustomEvent) => {
    open = event.detail.open as boolean;
  });

  function wordCopy(word: string) {
    copy(word);
    new Notice(
      t('Copied "{{word}}" to clipboard').replace(/{{word}}/g, word)
    );
  }
</script>

<div class="main">
  <div class="opener" class:open on:click={() => (open = !open)}>
    <div class="tree-item-icon collapse-icon" style="">
      <svg viewBox="0 0 100 100" class="right-triangle" width="8" height="8"
        ><path
          fill="currentColor"
          stroke="currentColor"
          d="M94.9,20.8c-1.4-2.5-4.1-4.1-7.1-4.1H12.2c-3,0-5.7,1.6-7.1,4.1c-1.3,2.4-1.2,5.2,0.2,7.6L43.1,88c1.5,2.3,4,3.7,6.9,3.7 s5.4-1.4,6.9-3.7l37.8-59.6C96.1,26,96.2,23.2,94.9,20.8L94.9,20.8z"
        /></svg
      >
    </div>
    {partOfSpeech ?? ""}
  </div>
  {#if open}
    <div transition:slide|local={{ duration: 150 }}>
      {#each definitions as definition, i}
        <div class="definition">
          {#if definition.definition}
            <div class="label">{t("Definition:")}</div>
            <p>{definition.definition}</p>
          {/if}
          {#if definition.example}
            <blockquote>
              {@html definition.example.replace(
                new RegExp(`(${word})`, "gi"),
                '<i class="mark">$1</i>'
              )}
            </blockquote>
          {/if}
          {#if definition.synonyms && definition.synonyms[i]}
            <div class="synonyms">
              <div class="label">{t("Synonyms:")}</div>
              <p>
                {#each definition.synonyms as synonym, i}
                  <span class="synonym" on:click={() => wordCopy(synonym)}
                    >{synonym}</span
                  >{#if i < definition.synonyms.length - 1}{", "}{/if}
                {/each}
              </p>
            </div>
          {/if}
          {#if definition.antonyms && definition.antonyms[i]}
            <div class="antonyms">
              <div class="label">{t("Antonyms:")}</div>
              <p>
                {#each definition.antonyms as antonym, i}
                  <span class="antonym" on:click={() => wordCopy(antonym)}
                    >{antonym}</span
                  >{#if i < definition.antonyms.length - 1}{", "}{/if}
                {/each}
              </p>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</div>

<style lang="scss">
  .definition > p {
    user-select: text;
  }

  .opener {
    display: flex;
    .collapse-icon::after {
      content: "\00a0";
    }
    svg {
      transform: rotate(-90deg);
    }
    &.open svg {
      transform: rotate(0);
    }
  }
  .antonym,
  .synonym {
    transition: 100ms;
    &:hover {
      color: var(--interactive-accent);
      border-radius: 2px;
    }
  }

  .main {
    background-color: var(--background-secondary);
    padding-left: 0.6rem;
    padding-right: 0.6rem;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
    margin-bottom: 0.3rem;
    border-radius: 0.3rem;

    blockquote {
      font-style: italic;
      margin: 0 0 1rem;
      padding-left: 1rem;
      border-left: 1px solid var(--background-modifier-border);
    }

    :global(.mark) {
      box-shadow: inset 0 -2px var(--text-faint);
    }
  }

  .label {
    font-size: 0.875em;
    font-weight: bold;
  }

  .antonyms,
  .synonyms {
    padding-top: 1rem;
  }

  .antonyms > p,
  .synonyms > p,
  .definition > p {
    margin-top: 0;
  }

  .definition {
    padding: 1.5rem 0;
    border-bottom: 1px solid var(--background-modifier-border);
  }

  .definition:last-child {
    border-bottom: none;
  }
</style>
