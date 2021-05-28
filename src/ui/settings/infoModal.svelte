<script lang="ts">
  import type { SynonymProvider, DefinitionProvider, PartOfSpeechProvider } from "src/api/types";

  export let synonymAPIs: SynonymProvider[];
  export let definitionAPIs: DefinitionProvider[];
  export let partOfSpeechAPIs: PartOfSpeechProvider[];
</script>

<div class="vertical-tab-content">
  <h2>API Information</h2>
  <h3>Definition API's</h3>

  {#each definitionAPIs as definition}
    <div class="setting-item">
      <div class="setting-item-info">
        <div class="setting-item-name">{definition.name}</div>
      </div>
      <a class="setting-item-control" href={definition.url}>Website</a>
    </div>
  {/each}

  <h3>Synonym API's</h3>

  {#each synonymAPIs as synonym}
    <div class="setting-item">
      <div class="setting-item-info">
        <div class="setting-item-name">{synonym.name}</div>
      </div>
      <a class="setting-item-control" href={synonym.url}>Website</a>
    </div>
  {/each}

  <h3>Part of Speech API's</h3>

  {#each partOfSpeechAPIs as pos}
    <div class="setting-item">
      <div class="setting-item-info">
        <div class="setting-item-name">{pos.name}</div>
      </div>
      <a class="setting-item-control" href={pos.url}>Website</a>
    </div>
  {/each}
</div>

<p class="feather">This Plugin is using <a href="https://feathericons.com/">Feather Icons</a></p>

<style lang="scss">
  h3 {
    font-weight: 400;
    margin: 0;
  }

  .feather{
    text-align: center;
    color: var(--text-muted);
    font-size: 0.9rem;
  }
</style>
