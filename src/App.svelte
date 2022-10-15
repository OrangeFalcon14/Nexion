<script>
import Dock from './lib/Dock.svelte';
import Window from './lib/Window.svelte';
import TopBar from './lib/TopBar.svelte';

let apps_list = ["Files", "Firefox", "Alacritty", "Pycharm Community Edition", "Visual Studio Code"];

let windows = [];

function new_window(app){
    let obj = app.detail;
    obj.number = windows.length;
    // windows = [...windows, app.detail];
    windows = [...windows, obj];
}

function close_window(number){
    let temp = JSON.parse(JSON.stringify(windows));
    temp.pop(number);
    windows = JSON.parse(JSON.stringify(temp));
}

function focus_window(event) {
    let number = event.detail;
    // let window = windows[number];
    
    for (let window of windows){
        window.focused = false;
    }

    windows[number].focused = true;
}
</script>

<div id="container">
    <TopBar />
    <Dock {apps_list} on:newWindow={new_window}/>
<!-- windows cannot be dragged bcoz when the windows are rerendered, all their ids are same bcoz windows.length is the same -->
    {#each windows as window}
        <Window app={window.app} number={window.number} focused={window.focused} on:focusWindow={focus_window} on:closeWindow={(number) => close_window(number.detail.number)}/> 
    {/each}
</div>
