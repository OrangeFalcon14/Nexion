<script>
import Dock from './lib/Dock.svelte';
import Window from './lib/Window.svelte';
import TopBar from './lib/TopBar.svelte';
import { onMount, setContext } from 'svelte';

let apps_list = ["Files", "Firefox", "Asteroids", "Alacritty", "Camera", "Pycharm Community Edition", "Settings", "Text Editor", "Todo", "Visual Studio Code"];
setContext("apps_list", apps_list);

let dock_apps = [
    {
        name: "Files",
        running: false,
        focused: false,
    },
    {
        name: "Firefox",
        running: false,
        focused: false,
    },
    {
        name: "Alacritty",
        running: false,
        focused: false,
    },
    {
        name: "Pycharm Community Edition",
        running: false,
        focused: false,
    },
    {
        name: "Visual Studio Code",
        running: false,
        focused: false,
    },
];

let window_ids = [];

let windows = [];

let applications_menu_show = false;

function new_window(app){
    applications_menu_show = false;
    
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
    focus_window({detail: {number: obj.number, app:obj.app}});

    let appInDock = false;
    dock_apps.forEach(element => {
        if(element.name === obj.app){
            element.running = true;
            appInDock = true;
        }
    });
    if(!appInDock && obj.app !== "Welcome"){
        dock_apps.push({
            name: obj.app,
            running: true,
            focused: true,
        })
    }
    dock_apps = dock_apps;
}

function close_window(event){
    for (var i = 0; i < windows.length; i++) {
        if (windows[i].number === event.detail.number) {
            windows.splice(i, 1);
            windows = windows;
        }
    }
    dock_apps.forEach(element => {
        if(element.name === event.detail.app){
            let isAppWindowOpen = false;
            for(let window of windows){
                if(window.app === event.detail.app){
                    isAppWindowOpen = true;
                }
            }
            if(!isAppWindowOpen){
                element.running = false;
                element.focused = false;
            }
        }
    });
    dock_apps = dock_apps;
}

function focus_window(event) {
    let number = event.detail.number;
    
    for (let window of windows){
        window.focused = false;
    }
    for(let window of windows){
        if(window.number == number){
            window.focused = true;
        }
    }
    windows = windows;

    for(let app of dock_apps){
        if(app.name == event.detail.app){
            app.focused = true;
        }else{
            app.focused = false;
        }
    }
    dock_apps = dock_apps;
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

onMount(() => {
    new_window({detail: {app: "Welcome", focused: true}})
})
</script>

<div id="container">
    <TopBar on:newWindow={new_window} applications_menu_show={applications_menu_show} />
    <Dock apps_list={dock_apps} on:newWindow={new_window}/>
    {#each windows as window}
        <Window app={window.app} number={window.number} focused={window.focused} initalTop={window.top} initalLeft={window.left} on:focusWindow={focus_window} on:closeWindow={close_window} on:windowMoved={windowMoved}/> 
    {/each}
</div>
