<script lang="ts">
  import type { Definition } from "src/api/types";

  export let definitions: Definition[];
  export let partOfSpeech: string;
</script>

<div class="main">
  <details>
    <summary>{partOfSpeech}</summary>

    {#each definitions as definition}
      <div class="definition">
        <p>Definition:<br />{definition.definition}</p>
        <p>Example:<br />{definition.example}</p>
        {#if definition.synonyms}
          <div class="synonyms">
            Synonyms:
            <ul>
              {#each definition.synonyms as synonym}
                <li>
                  {synonym}
                </li>
              {/each}
            </ul>
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
  }
  .synonyms > ul {
    padding-left: 1.2rem;
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
</style>
