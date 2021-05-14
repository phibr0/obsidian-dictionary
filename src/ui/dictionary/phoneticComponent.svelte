<script lang="ts">
  export let text: string;
  export let audio: string;
</script>

<div class="main">
  <details>
    <summary>{text.replace("/", "").replace("/", "")}</summary>
    <!-- svelte-ignore a11y-media-has-caption -->
    {#if audio}
    <audio controls>
      <source src={audio} type="audio/mpeg" />
    </audio>
    {/if}
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
  }

  audio {
    margin-top: 0.3rem;
  }

  details[open] summary ~ * {
    animation: open 0.2s ease-in-out;
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
