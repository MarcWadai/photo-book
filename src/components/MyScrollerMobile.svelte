<script>
  // import { fade, fly } from "svelte/transition";
  import { onMount } from "svelte";

  let count;
  let index = 0;
  let offset;
  let progress;
  let visible = true;
  let animationOpt = { x: 200, duration: 2000 };
  const loaded = new Map();
  export let myPhotos;
</script>

<style>
  section {
    display: flex;
    width: 100%;
  }
  .container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .m_picture {
    display: inline-block;
    background-color: rgba(0, 0, 0, 0.05);
    color: white;
    padding: 1em;
    /* margin: 0 0 2em 0; */
  }

  .background_wrapper-right {
    background-color: #e4a000;
    display: flex;
    width: 100%;
    top: -26px;
    z-index: -1;
    position: relative;
  }

  .background_wrapper-left {
    background-color: #e47300;
    display: flex;
    width: 100%;
    top: -26px;
    z-index: -1;
    position: relative;
  }

  .background_content {
    width: 100%;
    padding: 1em;
  }

  img {
    /* object-fit: cover;  */
    max-width: 100%;
    height: auto;
  }

  .m_picture-title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: 5px;
  }
</style>

{#each myPhotos as item, i}
  <div class="container">
    <section>
      <div class="m_picture">
        <div class="m_picture-title">
          <span>{item.title}</span>
          <span>{item.location}</span>
        </div>
        <img src={item.pictureUrl} alt={item.name} />
      </div>
    </section>

    <div
      class={i % 2 == 0 ? 'background_wrapper-left' : 'background_wrapper-right'}>
      <div class="background_content">
        <p>{item.description}</p>
      </div>
    </div>
  </div>
{/each}
