<script>
  // import { fade, fly } from "svelte/transition";
  import { onMount } from "svelte";
  import Scroller from "@sveltejs/svelte-scroller";

  let count;
  let index = 0;
  let offset;
  let progress;
  let visible = true;
  let animationOpt = { x: 200, duration: 2000 };
  const loaded = new Map();
  export let myPhotos;

  $: incomingPhotos(myPhotos);
  function incomingPhotos(x) {
    // index = 0;
    // count = x.length;
  }

  $: progressWatch(progress);
  function progressWatch(x) {
  }

  $: animationImg(offset);
  function animationImg(myoffset) {
    if (progress > 0.1) {
      if (myoffset > 0 && myoffset < 0.99) {
        visible = true;
      } else {
        visible = false;
      }
    }
    if (index % 2 == 0) {
      animationOpt = { x: 300, duration: 2000 };
    } else {
      animationOpt = { x: -300, duration: 2000 };
    }
  }

  // function lazy(node, data) {
  //   const img = new Image();
  //   console.log('data.src', data.src);
  //   img.src = data.src;
  //   img.onload = () => {
  //     loaded.set(data.src, img);
  //     node.setAttribute("src", data.src);
  //   };
  //   return {
  //     destroy() {} // noop
  //   };
  // }
</script>

<style>
  /* [slot="background"] {
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
  } */

  section {
    display: inline-block;
    width: 100vw;
  }
  .container {
    display: flex;
    width: 100%;
  }
  .m_picture {
    display: inline-block;
    height: 80vh;
    background-color: rgba(0, 0, 0, 0.05);
    color: white;
    padding: 1em;
    /* margin: 0 0 2em 0; */
  }

  .section-right {
    position: relative;
    right: -25%;
    max-width: 75%;
  }

  .section-left {
    position: relative;
    max-width: 75%;
  }

  .background_wrapper-right {
    background-color: #E4A000;
    display: flex;
    justify-content: flex-end;
    text-align: end;
    position: absolute;
    width: 100%;
  }

  .background_wrapper-left {
    background-color: #E47300;
    display: flex;
    justify-content: flex-start;
    position: absolute;
    width: 100%;
  }

  .background_content {
    width: 20%;
    padding: 1em;
  }

  @media (max-width: 600px) {
    .background_content {
      display: none;
    }
    .m_picture {
      width: 100%;
    }
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

<!-- <Scroller
  top={0.2}
  bottom={0.8}
  bind:index
  bind:offset
  bind:progress
  bind:count>
  <div slot="background">
    <div
      class={index % 2 == 0 ? 'background_wrapper-left' : 'background_wrapper-right'}>
      <div class="background_content" out:fade>
        {#if myPhotos && myPhotos[index]}
          <p>{myPhotos[index].description}</p>
        {/if}
      </div>
    </div>
  </div>

  <div slot="foreground">
    {#each myPhotos as item}
      <section>
        <div class="m_picture">
          {#if visible && myPhotos[index] && myPhotos[index].name == item.name}
            <div class="m_picture-title">
              <span>{item.title}</span>
              <span>{item.location}</span>
            </div>
            <img
              src={item.pictureUrl}
              alt={item.name}
              in:fly={animationOpt}
              out:fade />
          {/if}
        </div>
      </section>
    {/each}
  </div>
</Scroller> -->
{#each myPhotos as item, i}
  <div class="container">
    <div
      class={i % 2 == 0 ? 'background_wrapper-left' : 'background_wrapper-right'}>
      <div class="background_content">
        <p>{item.description}</p>
      </div>
    </div>
    <section>
      <div class={i % 2 == 0 ? 'section-right': 'section-left'}>
        <div class="m_picture">
          <div class="m_picture-title">
            <span>{item.title}</span>
            <span>{item.location}</span>
          </div>
          <img
            src={item.pictureUrl}
            alt={item.name}/>
        </div>
      </div>
    </section>
  </div>
{/each}
