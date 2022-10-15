<script>
import { createEventDispatcher } from "svelte";

let dispatch = createEventDispatcher();

import AlacrittyWindow from "./components/AlacrittyWindow.svelte";
import FilesWindow from "./components/FilesWindow.svelte";
import SettingsWindow from "./components/SettingsWindow.svelte";
import TextEditorWindow from "./components/TextEditorWindow.svelte";

export let app;
export let number;

let maximized = false;
let minimized = true;

$: top = maximized ? "0" : "100px";
$: left = maximized ? "0" : "100px";
$: height = maximized ? "calc(100% - 62px)" : "750px";
$: width = maximized ? "100%" : "1000px";

var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
let dragElement;
function dragMouseDown(e){
    dragElement = document.getElementById(number);
    console.log(number ,    dragElement);
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
}
</script>

<div id={number} class="window" style="top: {top}; left: {left}; height: {height}; width: {width};">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="window-titlebar" id={`${number}titlebar`} on:mousedown={(event) => dragMouseDown(event)}>
        <button class="titlebar-btn close-btn" on:click={() => dispatch("closeWindow", {number: number-1})}></button>
        <button class="titlebar-btn maximize-btn" on:click={() => {minimized = false; maximized = true;}}></button>
        <button class="titlebar-btn minimize-btn" on:click={() => {maximized = false; minimized = true;}}></button>

        <div class="window-title">{app}</div>
    </div>
    {#if app === "Files"}
        <FilesWindow />
    {:else if app === "Alacritty"}
        <AlacrittyWindow />

    {:else if app === "Settings"}
        <SettingsWindow />

    {:else if app === "Text Editor"}
        <TextEditorWindow />
    {/if}
</div>

<style>
.window {
    position: absolute;
    /* transition: width 0.25s, height 0.25s, left 0.25s, top 0.25s; */
    z-index: 9;
    background-color: var(--color2);
    border-radius: 10px;
}

.window .window-titlebar {
    /* #titlebar{ */
    height: 50px;
    width: 100%;
    background-color: var(--color1);
    border-radius: 10px;
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
    /* position: relative;
    top: 0; */
    margin-top: 0px;
    width: 100%;
    height: 100%;
    text-align: center;
    user-select: none;
    font-weight: 600;
}

</style>
