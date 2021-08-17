<script lang="ts">
  import type { DictionaryWord } from "src/integrations/types";

  export let data: DictionaryWord;
</script>

<div class="main">
  {data.origin}
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
  }
</style>
