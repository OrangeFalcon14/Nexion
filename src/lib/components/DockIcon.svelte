<script>
import { createEventDispatcher } from "svelte";

let dispatch = createEventDispatcher();

export let app;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<span class="dock-item" on:click={() => {dispatch("newWindow", {app, focused:true})}}>
    <img src={`/src/assets/icons/apps/${app.toLowerCase()}.svg`} alt={app} class="dock-item-icon">
    <!-- <img src={`../../assets/icons/apps/${app.toLowerCase()}.svg`} alt={app} class="dock-item-icon"> -->
</span>

<style>
.dock-item {
    user-select: none;
    border-radius: 15px;
    height: var(--dock-height);
    width: var(--dock-height);
}

.dock-item :hover {
    background-color: var(--color2);
}

.dock-item .dock-item-icon {
    padding: 10px;
    height: calc(var(--dock-height) - 15px);
    width: calc(var(--dock-height) - 15px);
}
</style>
