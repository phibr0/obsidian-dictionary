<script lang="ts">
  import t from "src/l10n/helpers";
  import { onMount } from "svelte";

  export let error: string;

  onMount(() => {
    console.error(error)
  })
</script>

<div class="main">
  <p class="error">Something went wrong..</p>
  <p class="errorDescription">
    {t('I can\'t find the word you are looking for or the server can\'t be reached. You can try again in a few minutes.')}
  </p>
  <details class="errorDescription"><summary>{t("View Error")}</summary>{error ?? ""}</details>
</div>

<style>
  .error {
    text-align: center;
    width: 100%;
    color: var(--text-muted);
  }

  .errorDescription {
    text-align: center;
    width: 100%;
    font-size: 0.9em;
    color: var(--text-faint);
  }
</style>
