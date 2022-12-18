<script>
import { createEventDispatcher } from "svelte";

export let path;
export let alt = "";

let dispatch = createEventDispatcher()
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<img src={path} alt={alt} on:click={() => dispatch("changeBackground", path)} />

<style>
img{
    aspect-ratio: 16 / 9;
    border-radius: 1rem;
    width: 100%;
    transition: 0.2s;
}
img:hover{
    scale: 1.05;
    filter: drop-shadow(0 0 10px var(--color1));
}
img:active{
    filter: saturate(80%) brightness(110%);
}
</style>
