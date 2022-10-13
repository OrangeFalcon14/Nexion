<script>
import Dock from './lib/Dock.svelte';
import Window from './lib/Window.svelte';
let apps_list = ["Files", "Firefox", "Alacritty", "Pycharm Community Edition", "Visual Studio Code"];

let windows = [];

function new_window(app){
    windows = [...windows, app.detail];
}

function close_window(number){
    let temp = JSON.parse(JSON.stringify(windows));
    temp.pop(number);
    windows = JSON.parse(JSON.stringify(temp));
}
</script>

<div id="container">
    <Dock {apps_list} on:newWindow={new_window}/>

    {#each windows as window}
        <Window app={window.app} number={windows.length} on:closeWindow={(number) => close_window(number.detail.number)}/> 
    {/each}
</div>
