<script>
  import Scroller from "@sveltejs/svelte-scroller";
  import Title from "./components/Title.svelte";
  import { fade, fly } from "svelte/transition";
  import { onMount } from "svelte";
  import { getPhotos } from "./services/network.js";
  import { photos } from "./store/store.js";

  let count;
  let index = 0;
  let offset;
  let progress;

  let myPhotos;
  let visible = true;
  let animationOpt = { x: 200, duration: 2000 };
  const loaded = new Map();

  $: {
    offset;
    if (progress > 0.1) {
      if (offset > 0 && offset < 0.99) {
        visible = true;
      } else {
        visible = false;
      }
    }
    if (index % 2 == 0) {
      animationOpt = { x: 300, duration: 2000 }
    } else {
      animationOpt = { x: -300, duration: 2000 }
    }
  }
  const unsubscribe = photos.subscribe(value => {
    myPhotos = value;
    count = myPhotos.length;
  });


	function lazy(node, data) {
		if (loaded.has(data.src)) {
			node.setAttribute('src', data.src);
		} else {
			// simulate slow loading network
			setTimeout(() => {
				const img = new Image();
				img.src = data.src;
				img.onload = () => {
					loaded.set(data.src, img);
					node.setAttribute('src', data.src); 
				};
			}, 2000);
		}

		return {
			destroy(){} // noop
		};
	}


  onMount(async () => {
    getPhotos();
  });
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
    background-color: rgba(0, 0, 0, 0.05);
    color: white;
    padding: 1em;
    margin: 0 0 2em 0;
    width: 75%;
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
    width: 100%;
    height: 100%;
  }

  .m_picture-title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: 5px;
  }
</style>

<Title />
{#if myPhotos}
  <Scroller top={0.2} bottom={0.8} bind:index bind:offset bind:progress>
    <div slot="background">
      <div
        class={index % 2 == 0 ? 'background_wrapper-left' : 'background_wrapper-right'}>
        <div
          class="background_content"
          out:fade>
          <p>{myPhotos[index].description}</p>
        </div>
      </div>
    </div>

    <div slot="foreground">
      {#each myPhotos as item}
        <section>
          <div class="m_picture">
            {#if visible && myPhotos[index].name == item.name}
              <div class="m_picture-title">
                <span>{item.title}</span>
                <span>{item.location}</span>
              </div>
              <img src="https://picsum.photos/id/202/300/200?blur=5&grayscale" use:lazy="{{src: item.pictureUrl}}" alt={item.name} in:fly={animationOpt} out:fade
              />
            {/if}
          </div>
        </section>
      {/each}
    </div>
  </Scroller>
{/if}
