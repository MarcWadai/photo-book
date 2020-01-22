<script>
  import { getPhotos } from "../services/network.js";
  import { loading, error, photos, selectedYear } from "../store/store.js";
  let years = ["2020", "2019", "2018"];

  async function fetchPhotos(year) {
    try {
      loading.update(() => true);
      const photosF = await getPhotos(year);
      photos.update(p => photosF);
      selectedYear.update(p => year);
      loading.update(() => false);
      error.update(() => false);
    } catch (err) {
      error.update(() => true);
      loading.update(() => false);
    }
  }
</script>

<style>
  .footer {
    position: fixed;
    bottom: 15px;
    display: flex;
    width: 100%;
    justify-content: center;
    z-index: 50;
  }

  .year-wrapper {
    margin: 10px;
    transition: all 300ms ease;
  }

  .year-wrapper:hover {
    transform: scale(1.3);
  }
</style>

<div class="footer">
  {#each years as year}
    <div class="year-wrapper" on:click={() => fetchPhotos(year)}>{year}</div>
  {/each}
</div>
