<script>
import { createEventDispatcher, setContext } from "svelte";

import { focusWindow } from "./utils/focusWindow";
import { windowMoved } from "./utils/misc";
import { closeWindow } from "./utils/closeWindow";

let dispatch = createEventDispatcher();

import AlacrittyWindow from "./components/application-windows/AlacrittyWindow.svelte";
import FilesWindow from "./components/application-windows/FilesWindow.svelte";
import SettingsWindow from "./components/application-windows/SettingsWindow.svelte";
import TextEditorWindow from "./components/application-windows/TextEditorWindow.svelte";
import CameraWindow from "./components/application-windows/CameraWindow.svelte";
import AsteroidsWindow from "./components/application-windows/AsteroidsWindow.svelte";
import TodoWindow from "./components/application-windows/TodoWindow.svelte";
import WelcomeWindow from "./components/application-windows/WelcomeWindow.svelte";

export let app;
export let number;
export let focused;
export let initalTop;
export let initalLeft;

setContext("window_id", number);

let maximized = false;
let minimized = true;

$: top = maximized ? "22px" : initalTop;
$: left = maximized ? "0px" : initalLeft;
$: height = maximized ? "calc(100% - 62px)" : "750px";
$: width = maximized ? "100%" : "1000px";

var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
let dragElement;
function dragMouseDown(e){
    dragElement = document.getElementById(number);
    dispatch("focusWindow", {number, app});
    e = e;
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
}

function elementDrag(e) {
    e = e;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    dragElement.style.top = (dragElement.offsetTop - pos2) + "px";
    dragElement.style.left = (dragElement.offsetLeft - pos1) + "px";
}

function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    windowMoved({
        detail: {
            number, 
            top: dragElement.style.top, 
            left: dragElement.style.left,
        }
    });
}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div id={number} class="window" class:focused={focused} style="top: {top}; left: {left}; height: {height}; width: {width};" on:mousedown={() => focusWindow({detail:{ number, app }})}>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="window-titlebar" id={`${number}titlebar`} on:mousedown={(event) => dragMouseDown(event)}>
        <button class="titlebar-btn close-btn" on:click={() => closeWindow({
            detail: {
                app,
                number
            }})}></button>
        <button class="titlebar-btn maximize-btn" on:click={() => {minimized = false; maximized = true;}}></button>
        <button class="titlebar-btn minimize-btn" on:click={() => {maximized = false; minimized = true;}}></button>

        <div class="window-title">
            <div>{app}</div>
        </div>
    </div>
    {#if app === "Files"}
        <FilesWindow />
    {:else if app === "Alacritty"}
        <AlacrittyWindow />

    {:else if app === "Settings"}
        <SettingsWindow />

    {:else if app === "Text Editor"}
        <TextEditorWindow />

    {:else if app === "Camera"}
        <CameraWindow />

    {:else if app === "Asteroids"}
        <AsteroidsWindow />

    {:else if app === "Todo"}
        <TodoWindow />

    {:else if app === "Welcome"}
        <WelcomeWindow />
    {/if}
</div>

<style>
.window {
    position: absolute;
    background-color: var(--color2);
    border-radius: 10px;
    z-index: 5;
    backdrop-filter: blur(var(--blur));
    box-shadow: none;
}

.window .window-titlebar {
    /* #titlebar{ */
    height: 50px;
    width: 100%;
    background-color: var(--color2);
    border-radius: 10px;
    isolation: isolate;
}

.window .window-titlebar .titlebar-btn {
    position: relative;
    top: 25%;
    left: 1%;
    height: 15px;
    width: 15px;
    background-color: transparent;
    border: none;
    outline: none;
    border-radius: 50%;
    margin-left: 1%;
    z-index: 2;
}

.window .window-titlebar .close-btn {
    background-color: #FF2946;
}

.window .window-titlebar .minimize-btn {
    /* padding-top: 0px; */
    background-color: #E4FF84;
}

.window .window-titlebar .maximize-btn {
    background-color: #00FF7A;
}

.window .window-titlebar .window-title {
    position: relative;
    bottom: 20px;
    margin-top: 0px;
    width: 100%;
    height: 100%;
    text-align: center;
    user-select: none;
    font-weight: 600;
    z-index: 1;
}
.window .window-titlebar .window-title > *{
    padding-top: 15px;
}
.focused{
    box-shadow: 0 0.5rem 1rem 1px #000000a1;
    z-index: 6;
}
.focused .window-titlebar{
    background-color: var(--color1);
}
</style>
