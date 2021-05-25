<script lang="ts">
  import type { SynonymProvider, DefinitionProvider } from "src/api/types";

  export let synonymAPIs: SynonymProvider[];
  export let definitionAPIs: DefinitionProvider[];
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
</div>

<style lang="scss">
  h3 {
    font-weight: 400;
    margin: 0;
  }
</style>
