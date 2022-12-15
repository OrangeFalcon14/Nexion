<script>
import DockIcon from './components/DockIcon.svelte';

export let apps_list;
</script>

<div id="dock" class="panel-dock">
    {#each apps_list as app}
        <DockIcon app={app.name} running={app.running} on:newWindow/>
    {/each}
</div>

<style>
#dock {
    user-select: none;
    z-index: 10;
    position: fixed;
    background-color: var(--color1);
    backdrop-filter: blur(20px);
}

.panel-dock{
    height: var(--dock-height);
    width: 100%;
    bottom: 0;
}

.compact-dock{
    height: auto;
    width: fit-content;
    max-width: fit-content;
    bottom: 1%;
    left: 50%;
    transform: translate(-50%, 0);
    border-radius: 10px;
    padding: 5px 10px 5px 10px;
}

</style>
