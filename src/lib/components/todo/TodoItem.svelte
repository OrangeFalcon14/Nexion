<script>
import { createEventDispatcher } from "svelte";

export let id;
export let title;
export let content;
export let done;

const dispatch = createEventDispatcher()

let toggle_btn_content = "+";
let showContent = false;

const toggleContent = () => {
    showContent = !showContent;
    if(showContent) toggle_btn_content = "-";
    else toggle_btn_content = "+";
}

const taskDone = () => {
    dispatch("taskDone", id);
}

const taskDelete = () => {
    dispatch("taskDelete", id);
}
</script>

<div class="todo-item">
    <div class="title" on:click={toggleContent}>
        <h4 class:done={done}>{title}</h4>
        <span class="toggle-btn">{toggle_btn_content}</span>
    </div>
    <div class="content-container" class:show={showContent}>
        <div class="content">
            {@html content}
        </div>
        <button class="done-btn" on:click={taskDone}></button>
        <button class="delete-btn"  on:click={taskDelete}></button>
    </div>
</div>

<style>
.todo-item{
    display: block;
    width: calc(100% - 2 * 5px - 2 * 20px);
    margin: 5px;
    background: var(--color1);
    border-radius: 10px;
    margin-bottom: 10px;
}
.done{
    text-decoration: line-through;    
}
.title{
    padding: 20px;
    font-size: 20px;
    transition: all 0.2s;
}
.title:hover{
    opacity: 0.8;
}
.todo-item h4{
    margin: 0px;
    display: inline-block;
}
.toggle-btn{
    user-select: none;
    font-size: 20px;
    float:right;
}
.content-container{
    display: none;
    max-height: 0;
    overflow: hidden;
    transition: all 0.2s;
    border-radius: 10px;
}
.content-container:active{
    max-height: fit-content;
}
.show{
    margin-top: 5px;
    padding: 5px;
    display:block;
    max-height: fit-content;
    border: 5px solid var(--color1);
    border-top: none;
}
.content{
    background: var(--color2);
    max-height: 300px;
    overflow: auto;
    padding: 10px 0;
}

.done-btn{
    background: #00ff7a;
}
.delete-btn{
    background: #ff2946;
    float:right;
}
.done-btn, .delete-btn{
    border: 2px solid transparent;
    outline: none;
    padding: 10px;
    border-radius: 10px;
    margin-top: 10px;
    color:black;
    font-size: 18px;
    transition: 0.2s all ease-in;    
    display: inline;
    font-family: inherit;
}
.done-btn:hover, .delete-btn:hover{
    opacity: 0.8;
}
</style>
