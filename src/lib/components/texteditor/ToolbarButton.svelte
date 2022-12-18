<script>
import { createEventDispatcher, getContext } from "svelte";

export let text;
export let title;

const dispatch = createEventDispatcher();

let files;

const file_input_id = getContext("window_id") + "file_input";
</script>

{#if title !== "Open"}
    <button on:click {title}>
        {text}
    </button>
{:else}
    <input on:change={() => {files = document.getElementById(file_input_id).files; dispatch("fileOpen", {files})}} bind:files={files} type="file" id={file_input_id} style="display: none;">
    <label for={file_input_id}>{text}</label>
{/if}
<style>
button{
    border-radius: 5px;
    padding: 10px;
    position: relative;
    border: 1px solid var(--accent-color);
    outline: none;
    background: var(--color2);
    color: #ccc;
    font-size: 20px;
    margin: auto 2px;
    top: 50%;
    transform: translate(0, -50%);
    transition: all 0.2s
}

button:first-of-type{
    margin-left: 1%;
}

button:hover, label:hover{
    opacity: 0.75;
}

label{
    display: inline;
    border-radius: 5px;
    padding: 10px;
    position: relative;
    border: 1px solid var(--accent-color);
    outline: none;
    background: var(--color2);
    color: #ccc;
    font-size: 20px;
    margin: auto 2px;
    top: 2px;
    transition: all 0.2s
}
</style>
