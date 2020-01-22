<script>
  import Title from "./components/Title.svelte";
  import FooterMenu from "./components/FooterMenu.svelte";
  import MyScroller from "./components/MyScroller.svelte";
  import MyScrollerMobile from "./components/MyScrollerMobile.svelte";
  
  import Loading from "./components/Loading.svelte";
  import { fade, fly } from "svelte/transition";
  import { onMount } from "svelte";
  import { photos, loading, error, selectedYear } from "./store/store.js";
  import { checkMobile } from "./services/utils.js";

  let myPhotos = [];
  let visible = true;
  let animationOpt = { x: 200, duration: 2000 };
  const loaded = new Map();
  let isMobile = false;
  let isLoading = false;
  let isError = false;
  let selected = {};
  let year;
  let previousYear;

  selectedYear.subscribe(value => {
    previousYear = year;
    year = value;
    if (!selected[value]) {
      selected[value] = MyScroller;
    }
  })

  photos.subscribe(value => {
    if (value) {
      myPhotos = [...value];
    }
  });

  loading.subscribe(value => {
    try {
      isLoading = value;
      const elmnt = document.getElementById("myloader");
      if (value || isError) {
        if (!myPhotos) {
          const headerOffset = 50;
          const elementPosition = elmnt.getBoundingClientRect().top;
          var offsetPosition = elementPosition + headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        } else {
          elmnt.scrollIntoView({ behavior: "smooth" }); // Top
        }
      } else {
        if (elmnt) {
          elmnt.scrollIntoView({ behavior: "smooth" }); // Top
        }
      }
    } catch (err) {
      console.error(err);
    }
  });

  error.subscribe(value => {
    isError = value;
  });

  onMount(() => {
    isMobile = checkMobile(
      navigator.userAgent || navigator.vendor || window.opera
    );
  });
</script>

<style>
  .text_mobile {
    width: 100%;
    text-align: center;
  }

  .load {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;
  }
</style>

<svelte:window on:mobilecheck={checkMobile} />

<Title />
<div id="myloader" />
{#if isError}
  <div class="load">An error has occured sorry :/</div>
{/if}

{#if isLoading}
  <div class="load">
    <Loading />
  </div>
{/if}

{#if myPhotos.length && !isMobile}
  <MyScroller {myPhotos}/>
{/if}

{#if myPhotos.length && isMobile}
  <MyScrollerMobile {myPhotos}/>
{/if}

{#if myPhotos && !myPhotos.length}
  <div class="load">No pictures found for this year</div>
{/if}

<FooterMenu />
