<script>
import { createEventDispatcher } from "svelte";

export let showModal = false;

let uploadedImages;
let imageURL;

let dispatch = createEventDispatcher();
</script>

{#if showModal}
    <div class="backdrop">
        <div class="modal">
            <div class="upload">
                <p>Upload an image</p>
                <br>
                <label for="background-input-file">Choose a file</label>
                <input type="file" id="background-input-file"  bind:files={uploadedImages} />
                <br>
                <button on:click={() => dispatch("changeBackground", {from: "modal", images: uploadedImages, type: "image"})}>Apply</button>
            </div>
            <div style="display: flex; align-items: center; justify-content: center;">
                <p>OR</p>
            </div>
            <div class="url">
                <label for="background-input-url">Enter a url to an image</label>
                <br><br>
                <input type="url" id="background-input-url" bind:value={imageURL} />
                <br>
                <br>
                <button on:click={() => dispatch("changeBackground", {from: "modal", url: imageURL, type: "url"})}>Apply</button>
            </div>
            <button on:click={() => showModal = false} class="cancel-btn">Cancel</button>
        </div>
    </div>
{/if}

<style>
.backdrop{
    position:absolute;
    top: 50px;
    left: 0;
    background: #000000ae;
    height: calc(100% - 50px);
    width: 100%;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal{
    background: var(--color2);
    padding: 2rem;
    border-radius: 1rem;
    display: grid;
    grid-template-columns: calc(50% - 10px - 2rem) 20px calc(50% - 10px - 2rem);
    gap: 1rem;
}
input[type="file"]{
    display: none;
}
input[type="url"]{
    background: var(--color1);
    border: 2px solid transparent;
    outline: none;
    padding: 10px;
    border-radius: 10px;
    color: white;
    font-size: 15px;
    transition: 0.2s all ease-in;
    width: 90%;
}
input[type="url"]:focus{
    border: 2px solid var(--accent-color);
}
button, label[for="background-input-file"]{
    background: var(--color1);
    border: 2px solid transparent;
    outline: none;
    padding: 10px;
    border-radius: 10px;
    text-align: center;
    color: #ddd;
    font-size: 15px;
    transition: 0.2s all ease-in;    
    display: inline;
}
label[for="background-input-file"]{
    display: block;
}
.cancel-btn{
    width: fit-content;
    grid-column-start: 1;
    grid-column-end: 3;
}
p{
    margin: 0;
}
</style>
