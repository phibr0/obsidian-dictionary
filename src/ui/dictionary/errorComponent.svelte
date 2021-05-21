<script lang="ts">
  export let error: string;
</script>

<div class="main">
  <p class="error">Something went wrong..</p>
  <p class="errorDescription">
    I can't find the word you are looking for or the server can't be reached.
    You can try again in a few minutes.
  </p>
  <details style="display: none">{error ?? ""}</details>
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
