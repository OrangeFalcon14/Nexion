<script>
import AppIcon from "./components/AppIcon.svelte";

let apps_list = ["Alacritty", "Files", "Firefox", "Pycharm Community Edition", "Visual Studio Code"];

</script>

<div id="applications-menu">
    <input type="text" id="applications-menu-search" placeholder="Search..." />
    <br><br>
    <div id="apps-container">
        {#each apps_list as app}
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

#applications-menu-search {
    color: white;
    font-size: 15px;
    border: none;
    outline: none;
    background-color: var(--color2);
    border-radius: 10px;
    padding: 10px;
    width: calc(100% - 20px);
}
</style>
