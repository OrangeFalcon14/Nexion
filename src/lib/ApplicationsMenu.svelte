<script>
    import { onMount } from "svelte";
import AppIcon from "./components/AppIcon.svelte";
import SearchField from "./components/SearchField.svelte";

let apps_list = ["Alacritty", "Files", "Firefox", "Pycharm Community Edition", "Visual Studio Code"];

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
}

#apps-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
}
</style>
