<script lang="ts">
import { slide } from "svelte/transition";


  export let text: string;
  export let audio: string;

  let open = false;
</script>

<div class="main">
  {#if audio}
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
      {text.replace("/", "").replace("/", "")}
    </div>
    {#if open}
      <div transition:slide|local={{ duration: 100 }}>
        <!-- svelte-ignore a11y-media-has-caption -->
        <audio controls>
          <source
            src={audio.startsWith("http") ? audio : "https:" + audio}
            type="audio/mpeg"
          />
        </audio>
      </div>
    {/if}
  {:else}
    {text.replace("/", "").replace("/", "")}
  {/if}
</div>

<style lang="scss">
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
