<script>
import Dock from './lib/Dock.svelte';
import Window from './lib/Window.svelte';
import TopBar from './lib/TopBar.svelte';
import { setContext } from 'svelte';

let apps_list = ["Files", "Firefox", "Asteroids", "Alacritty", "Camera", "Pycharm Community Edition", "Text Editor", "Todo", "Visual Studio Code"];
setContext("apps_list", apps_list);

let window_ids = [];

let windows = [];

let applications_menu_show = false;

function new_window(app){
    applications_menu_show = false;
    console.log(applications_menu_show);
    let obj = app.detail;
    
    while(true){
        obj.number = Math.floor(Math.random() * 1000);

        if(window_ids.length == 0){
            window_ids = [...window_ids, obj.number];
            break;
        }

        if(window_ids.indexOf(obj.number) == -1){
            break;
        }
    }

    obj.top = "100px";
    obj.left = "100px";

    windows = [...windows, obj];
    focus_window({detail: obj.number});
}

function close_window(number){
    for (var i = 0; i < windows.length; i++) {
        if (windows[i].number === number) {
            windows.splice(i, 1);
            windows = windows;
        }
    }
}

function focus_window(event) {
    let number = event.detail;
    
    for (let window of windows){
        window.focused = false;
    }
    for(let window of windows){
        if(window.number == number){
            window.focused = true;
        }
    }
    windows = windows;
}

function getWindow(number) {
    for (const window of windows) {
        if(window.number == number){
            return window;
        }
    }
}

function windowMoved(event){
    let top = event.detail.top;
    let left = event.detail.left;
    
    let window = getWindow(event.detail.number);

    window.top = top;
    window.left = left;
}
</script>

<div id="container">
    <TopBar on:newWindow={new_window} applications_menu_show={applications_menu_show} />
    <Dock on:newWindow={new_window}/>
    {#each windows as window}
        <Window app={window.app} number={window.number} focused={window.focused} initalTop={window.top} initalLeft={window.left} on:focusWindow={focus_window} on:closeWindow={(number) => close_window(number.detail.number)} on:windowMoved={windowMoved}/> 
    {/each}
</div>
