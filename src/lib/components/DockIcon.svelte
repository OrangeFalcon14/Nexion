<script>
import { newWindow } from "../utils/newWindow";

export let running;
export let app;
export let focused;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<span class="dock-item" on:click={() => newWindow({
    detail:{
        app, 
        focused:true
    }})} class:focused={focused}>
    <!-- <img src={`/Nexion/icons/apps/${app.toLowerCase()}.svg`} alt={app} class="dock-item-icon"> -->
    {#if app != "Asteroids"}
    <img src={`/Nexion/icons/apps/${app.toLowerCase()}.svg`} alt={app} class="dock-item-icon">
    {:else}
    <img src={`/Nexion/icons/apps/asteroids.png`} alt={app} class="dock-item-icon">
    {/if}
    <!-- <img src={`../../assets/icons/apps/${app.toLowerCase()}.svg`} alt={app} class="dock-item-icon"> -->
    <span class="running-indicator" class:hide={!running}></span>
</span>

<style>
.dock-item {
    user-select: none;
    border-radius: 15px;
    height: var(--dock-height);
    width: var(--dock-height);
    padding-bottom: 20px;
}

.focused .dock-item-icon{
    backdrop-filter: brightness(175%);
}

.dock-item :hover {
    background-color: var(--color1);
}

.dock-item .dock-item-icon {
    border-radius: 10px;
    padding: 10px;
    height: calc(var(--dock-height) - 20px);
    width: calc(var(--dock-height) - 20px);
    transition: 0.2s;
}

.running-indicator{
    position:relative;
    bottom: 3px;
    /* left: calc(var(--dock-height) / 2); */
    right: calc(var(--dock-height) / 2 + 7px);
    display: inline-block;
    height: 5px;
    width: 5px;
    border-radius: 50%;
    background: var(--accent-color);
    transition: 200ms bottom;
}
.hide{
    bottom: -5px;
}
.compact-dock .hide{
    bottom: -50px;
}
</style>
