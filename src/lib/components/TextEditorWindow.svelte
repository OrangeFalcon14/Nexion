<script>
let text_content;

let text_wrap = "off";
</script>

<div class="window-container">
    <div class="toolbar"></div>
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
