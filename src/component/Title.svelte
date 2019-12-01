<script>
  import { fade, fly } from "svelte/transition";
  import { onMount } from "svelte";
  let visible = false;
  // remove the blur from canvas
  function fix_dpi(canvas) {
    //get DPI
    let dpi = window.devicePixelRatio;
    //get CSS height
    //the + prefix casts it to an integer
    //the slice method gets rid of "px"
    let style_height = +getComputedStyle(canvas)
      .getPropertyValue("height")
      .slice(0, -2);
    //get CSS width
    let style_width = +getComputedStyle(canvas)
      .getPropertyValue("width")
      .slice(0, -2);
    //scale the canvas
    canvas.setAttribute("height", style_height * dpi);
    canvas.setAttribute("width", style_width * dpi);
  }

  function drawLines(ctx, startX, startY, endX, endY) {
    // Draw lines
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle =
      "rgb(" +
      Math.round(256 * Math.random()) +
      "," +
      Math.round(256 * Math.random()) +
      "," +
      Math.round(256 * Math.random()) +
      ", 0.2)";
    ctx.stroke();
  }
  function generateLines() {
    /* setTimeout(function() { */
    // Canvas
    var c = document.getElementById("magugulines");
    var ctx = c.getContext("2d");
    fix_dpi(c);
    ctx.lineWidth = 5;
    ctx.op;
    for (let i = 0; i < 3; i++) {
      drawLines(
        ctx,
        0,
        c.height * Math.random(),
        c.width,
        c.height * Math.random()
      );
      drawLines(
        ctx,
        c.width * Math.random(),
        0,
        c.width * Math.random(),
        c.height
      );
    }
    /* window.requestAnimationFrame(generateLines); */
    /* }, 1000); */
  }

  function social() {
    console.log("im social");
  }
  onMount(async () => {
    generateLines();
    /* window.requestAnimationFrame(generateLines); */
    visible = true;
  });
</script>

<style>
  .wrapper {
    position: relative;
    width: 100%;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  span {
    color: #ffeeea;
    font-style: italic;
  }
  #magugulines {
    position: absolute;
    width: 100%;
    height: 500px;
  }
  .marcoucou {
    animation: marcoucou 10s ease-in-out infinite alternate;
  }
/*   @keyframes marcoucou {
    0% {
      transform: scale(1) rotate(-360deg);
      -webkit-transform: scale(1) rotate(-360deg);
    }
    100% {
      transform: scale(10) rotate(360deg);
      -webkit-transform: scale(10) rotate(360deg);
    }
  } */
  img {
    margin-top: 15px;
    padding: 10px;
    width: 32px;
    height: 32px;
  }
  img.insta {
    width: 28px;
    height: 28px;
  }
  img.linkedin {
    width: 30px;
    height: 30px;
  }
</style>

<canvas id="magugulines" />
<div class="wrapper" on:click={generateLines}>
  {#if visible}
    <h1 in:fly={{ y: 200, duration: 1000 }} out:fade class="marcoucou">
      Marc 菇菇
    </h1>
    <span>"Coucou toi. C'est moi. Non moi. Oui toi."</span>
    <div>
      <a href="https://medium.com/@marcoucou" target="_blank">
        <img src="images/medium.svg" alt="medium" />
      </a>
      <a href="https://github.com/marcWadai" target="_blank">
        <img src="images/github.svg" alt="github" />
      </a>
      <a href="https://instagram.com/marcoucou/" target="_blank">
        <img src="images/insta.svg" alt="insta" class="insta" />
      </a>
      <a href="https://www.linkedin.com/in/marc-sirisak/" target="_blank">
        <img src="images/linkedin.svg" alt="linkedin" class="linkedin" />
      </a>

    </div>
  {/if}
</div>
