<script>
import ToolbarButton from "./ToolbarButton.svelte";

let reader = new FileReader();

let text_content;

let text_wrap = "off";

let file_name = "Untitled.txt";

const save_file = () => {
    let content = text_content;
    let a = document.createElement('a');
    let blob = new Blob([content], { 'type': "text/plain" });
    a.href = window.URL.createObjectURL(blob);
    a.download = file_name;
    a.click();

};

const new_file = () => {
    text_content = "";
};
const open_file = (event) => {
    let file = event.detail.files[0];
    console.log(file);
    reader.onload = () => {
        text_content = reader.result;
    }
    reader.readAsText(file)
};
</script>

<div class="window-container">
    <div class="toolbar">
        <ToolbarButton on:click={new_file} text="" title="New" />
        <ToolbarButton on:click={save_file} text="" title="Save" />
        <ToolbarButton on:fileOpen={open_file} text="" title="Open" />
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
