<script>
import { createEventDispatcher, onMount } from "svelte";

const dispatch = createEventDispatcher();

let title = "";
let content = "";

let error = ""

const addTodoItem = () => {
    if(title.trim() !== ""){
        dispatch("addTodoItem", {
            title,
            content
        })
    }else{
        error = "Title cannot be empty!"
    }
}

const handleKeyup = (event) => {
    if(event.key == "Escape"){
        dispatch("closeModal")
    }
}

onMount(() => {
    // @ts-ignore
    document.querySelector(".add-todo-container input").focus()
})
</script>

<div class="backdrop" on:keyup={handleKeyup}>
    <div class="add-todo-container">
        <p>Add Todo</p>
        <input type="text" bind:value={title} />
        {#if error}
            <br>
            <div class="error">{error}</div>
        {/if}
        <br>
        <textarea type="text" bind:value={content} />
        <br>
        <button on:click={addTodoItem}>Add</button>
    </div>
</div>
<style>
.backdrop{
    width: 100%;
    height: calc(100% - 50px);
    position: absolute;
    top: 50px;
    left: 0;
    background: rgb(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
}
.add-todo-container{
    background: var(--color2);
    padding: 20px;
    border-radius: 10px;
}
.add-todo-container p{
    padding: 10px; 
    margin: 0 0 10px 0;
}
.add-todo-container input{
    background: var(--color1);
    border: 2px solid transparent;
    outline: none;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 10px;
    color: white;
    font-size: 24px;
    transition: 0.2s all ease-in;
}
.add-todo-container input:focus{
    border: 2px solid var(--accent-color);
}

.add-todo-container textarea{
    background: var(--color1);
    box-sizing: border-box;
    border: 2px solid transparent;
    outline: none;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 10px;
    color: white;
    font-size: 18px;
    font-family: sans;
    transition: 0.2s all;
    width: 100%;
    max-width: 100%;
    resize: vertical;
}
.add-todo-container textarea:focus{
    border: 2px solid var(--accent-color);
}

.add-todo-container button{
    background: var(--color1);
    border: 2px solid transparent;
    outline: none;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 10px;
    color: white;
    font-size: 18px;
    transition: 0.2s all ease-in;    
    display: inline;
}
.add-todo-container button:hover{
    opacity: 0.8;
}
.add-todo-container button:active, .add-todo-container button:focus{
    border: 2px solid var(--accent-color);
}

.add-todo-container .error{
    color: #ff2946;
    /* margin-bottom: 10px; */
}
</style>
