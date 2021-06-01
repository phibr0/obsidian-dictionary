<script lang="ts">
  import t from "src/l10n/helpers";
  import type { Definition } from "src/api/types";

  export let word: string;
  export let definitions: Definition[];
  export let partOfSpeech: string;
</script>

<div class="main">
  <details>
    <summary>{partOfSpeech}</summary>

    {#each definitions as definition, i}
      <div class="definition">
        {#if definition.definition}
          <div class="label">{t('Definition:')}</div>
          <p>{definition.definition}</p>
        {/if}
        {#if definition.example}
          <blockquote>
            {@html 
              definition.example.replace(
                new RegExp(`(${word})`, "gi"), 
                '<i class="mark">$1</i>'
              )
            }
          </blockquote>
        {/if}
        {#if definition.synonyms && definition.synonyms[i]}
          <div class="synonyms">
            <div class="label">{t('Synonyms:')}</div>
            <p>
              {#each definition.synonyms as synonym, i}
                {synonym}{#if i < definition.synonyms.length - 1}{", "}{/if}
              {/each}
              </p>
          </div>
        {/if}
      </div>
    {/each}
  </details>
</div>

<style lang="scss">
  .main {
    background-color: var(--background-secondary);
    padding-left: 0.6rem;
    padding-right: 0.6rem;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
    margin-bottom: 0.3rem;
    border-radius: 0.3rem;

    details > summary {
      text-transform: capitalize;
    }

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

  details[open] summary ~ * {
    animation: open 0.3s ease-in-out;
  }

  @keyframes open {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .synonyms {
    padding-top: 1rem;
  }

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
