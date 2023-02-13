<script>
import Dock from './lib/Dock.svelte';
import Window from './lib/Window.svelte';
import TopBar from './lib/TopBar.svelte';
import LockScreen from './lib/LockScreen.svelte';
import { onMount, setContext } from 'svelte';

import { newWindow } from './lib/utils/newWindow';
import { setCSSVar} from './lib/utils/misc';

import { windows_store} from "./lib/store/core";

let windows;

windows_store.subscribe(value => windows = value)

$:{ windows_store.set(windows) }

let colorConfig = JSON.parse(localStorage.getItem("colorConfig")) || undefined;
if(colorConfig){
    setCSSVar("--color1", colorConfig["--color1"]);
    setCSSVar("--color2", colorConfig["--color2"]);
    setCSSVar("--color3", colorConfig["--color3"]);
    setCSSVar("--accent-color", colorConfig["--accent-color"]);
    setCSSVar("--blur", colorConfig["--blur"] + "px");
}

setContext("colorConfig", colorConfig);

const defaultCSSVars = {
    "--color1": "#060610ae",
    "--color2": "#161620cf",
    "--color3": "#111118cf",
    "--accent-color": "#736099",
    "--blur": 20,
}

setContext("defaultCSSVars", defaultCSSVars);

onMount(() => {
    newWindow({detail: {app: "Welcome", focused: true}})
    
    let currentWallpaper = localStorage.getItem("currentWallpaper") || undefined;
    // @ts-ignore
    if(currentWallpaper) document.querySelector("#container").style.backgroundImage = `url(${currentWallpaper})`;
})
</script>

<div id="container">
    <TopBar/>
    <Dock/>
    {#each windows as window}
        <Window app={window.app} number={window.number} focused={window.focused} initalTop={window.top} initalLeft={window.left}/> 
    {/each}
    <LockScreen/>
</div>
