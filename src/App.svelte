<script>
  import Scroller from "@sveltejs/svelte-scroller";
  import Title from "./component/Title.svelte";
  import { fade, fly } from "svelte/transition";
  export let name;
  let count;
  let index;
  let offset;
  let progress;
</script>

<style>
  [slot="background"] {
    background-color: rgba(255, 62, 0, 0.05);
    font-size: 1.4em;
	overflow: hidden;
	height: 80vh;
  }

  [slot="background"] p {
    margin: 0;
  }

  [slot="foreground"] {
    pointer-events: none;
  }

  [slot="foreground"] section {
    display: flex;
    width: 100%;
  }

  .m_picture {
    height: 80vh;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 1em;
    margin: 0 0 2em 0;
    width: 70%;
  }
  [slot="foreground"] section:nth-child(odd) {
    justify-content: flex-end;
  }

  [slot="foreground"] section:nth-child(even) {
    justify-items: flex-start;
  }

  .background_wrapper-right {
    display: flex;
	justify-content: flex-end;
	text-align: end;
  }

  .background_wrapper-left {
    display: flex;
    justify-content: flex-start;
  }

  .background_content {
    width: 30%;
  }
</style>

<Title />
<Scroller top={0.2} bottom={0.8} bind:index bind:offset bind:progress>

  <div slot="background">
    <div class={index % 2 == 0 ? 'background_wrapper-left' : 'background_wrapper-right'}>
      <div class="background_content" in:fly="{{ y: 200, duration: 2000 }}" out:fade>
        <h3>I am a title</h3>
        <span>I am a date and location</span>
        <p>Description {index + 1} is currently active.</p>
      </div>
    </div>
  </div>

  <div slot="foreground">
    <section in:fly="{{ y: 200, duration: 2000 }}" out:fade>
      <div class="m_picture">This is the first picture.</div>
    </section>
    <section>
      <div class="m_picture">This is the second picture.</div>
    </section>
    <section>
      <div class="m_picture">This is the third picture.</div>
    </section>
  </div>
</Scroller>
