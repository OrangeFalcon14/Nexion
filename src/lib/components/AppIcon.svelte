<script>
import { createEventDispatcher } from "svelte";

const dispatch = createEventDispatcher()
export let app;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="applications-menu-app" title={app} on:click={() => {dispatch("newWindow", {app, focused:true})}}>
    {#if app != "Asteroids"}
        <img src="/src/assets/icons/apps/{app.toLowerCase()}.svg" alt={app} style="height: 64px" />
    {:else}
        <img src="/src/assets/icons/apps/asteroids.png" alt={app} style="width: 64px; height:54px; margin-bottom: 10px;" />
    {/if}
    <!-- <img src="../../assets/icons/apps/{app.toLowerCase()}.svg" alt={app} /> -->
    <br>{app}
</div>

<style>

.applications-menu-app {
    padding: 5px 10px 5px 10px;
    text-align: center;
    width: fit-content;
    max-width: 84px;
    max-height: 84px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.applications-menu-app:hover {
    background-color: var(--color2);
}
</style>
