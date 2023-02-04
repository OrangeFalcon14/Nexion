<script>
import ToolbarButton from "../texteditor/ToolbarButton.svelte";
import Modal from "../texteditor/Modal.svelte";

let reader = new FileReader();

let text_content;
let original_file_content;

let text_wrap = "off";

let file_name = "Untitled.txt";
$: saved = original_file_content == text_content;

let show_modal = false;

const save_file = () => {
    let content = text_content;
    let a = document.createElement('a');
    let blob = new Blob([content], { 'type': "text/plain" });
    a.href = window.URL.createObjectURL(blob);
    a.download = file_name;
    a.click();
    saved = true;
};

const new_file = () => {
    if(saved) text_content = "";
    else show_modal = true;
};
const open_file = (event) => {
    let file = event.detail.files[0];
    reader.onload = () => {
        text_content = original_file_content = reader.result.toString(); 
    }
    reader.readAsText(file)
    file_name = file.name
};
</script>

<div class="window-container">
    <div class="toolbar">
        <ToolbarButton on:click={new_file} text="" title="New" />
        <ToolbarButton on:click={save_file} text="" title="Save" />
        <ToolbarButton on:fileOpen={open_file} text="" title="Open" />
    </div>
    <textarea wrap={text_wrap} bind:value={text_content} />
    <Modal bind:show_modal>
        <h1>You have unsaved work! </h1>
        <h3>Your changes to {file_name} will be lost if you don't save them.</h3>
    </Modal>
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
