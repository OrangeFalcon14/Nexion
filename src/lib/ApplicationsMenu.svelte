<script>
import { getContext, onMount } from "svelte";
import AppIcon from "./components/applications-menu/AppIcon.svelte";
import SearchField from "./components/applications-menu/SearchField.svelte";

let apps_list = getContext("apps_list");

let shownApps = JSON.parse(JSON.stringify(apps_list));

function showApps(event){
    shownApps = event.detail;
}

onMount(() => {
    document.getElementById("applications-menu-search").focus();
})

</script>

<div id="applications-menu">
    <SearchField {apps_list} on:closeApplicationMenu on:showApps={showApps} />
    <br><br>
    <div id="apps-container">
        {#each shownApps as app}
            <AppIcon {app} on:newWindow />
        {/each}
    </div>
</div>

<style>
#applications-menu {
    position: fixed;
    padding: 10px;
    border-radius: 10px;
    top: 27px;
    left: 5px;
    width: var(--app-menu-width);
    min-width: var(--app-menu-width);
    height: var(--app-menu-height);
    max-height: var(--app-menu-height);
    overflow: auto;
    background-color: var(--color1);
    backdrop-filter: blur(var(--blur));
    z-index: 10;
}

#apps-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
}
</style>
