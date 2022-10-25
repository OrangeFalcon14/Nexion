<script>
import ToolbarButton from "./ToolbarButton.svelte";
let text_content;

let text_wrap = "off";

const save_file = () => {};
const new_file = () => {};
const open_file = () => {};
</script>

<div class="window-container">
    <div class="toolbar">
        <ToolbarButton on:click={new_file} text="" title="New" />
        <ToolbarButton on:click={save_file} text="" title="Save" />
        <ToolbarButton on:click={open_file} text="" title="Open" />
    </div>
    <textarea wrap={text_wrap} bind:value={text_content} />
</div>

<style>
.window-container{
    height: calc(100% - 50px);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    overflow: auto;
    user-select: auto;
    font-size: 20px;
}
.toolbar{
    height: 50px;
    background: var(--color3);
}
textarea{
    color: white;
    font-size: 17px;
    background-color: var(--color2);
    border: none;
    outline: none;
    height: calc(99% - 50px);
    width: 99.5%;
    resize: none;
}
textarea::selection{
    background-color: var(--accent-color);
}
</style>
