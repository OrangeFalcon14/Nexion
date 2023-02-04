<script>
import AddTodoItem from "../todo/AddTodoItem.svelte";
import TodoItem from "../todo/TodoItem.svelte";

let todos = /* JSON.parse(localStorage.getItem("todos")) || */ [];

let showAddTodoItem = false;

const addTodoItem = (event) => {
    showAddTodoItem = false;
    let {title, content} = event.detail;
    content = content.replaceAll("\n", "<br>");
    let id = Math.floor(Math.random() * 1000);
    todos.push({
        id,        
        title,
        content,
        done: false,
    });
    todos = todos;
    localStorage.setItem("todos", todos.toString());
}

const handleTaskDone = (event) => {
    let id = event.detail;
    for (let todo of todos) {
        if(todo.id == id){
            todo.done = true;
        }
    }
    todos = todos;
}

const handleTaskDelete = (event) => {
    let id = event.detail;
    todos.forEach((element, index) => {
        if(element.id == id){
            todos.splice(index, 1);
        }
    })
    todos = todos;
}
</script>

<div class="window-container">
    <h2>Your Todos</h2>
    <br>
    {#each todos as todo}
        <TodoItem title={todo.title} content={todo.content} done={todo.done} id={todo.id} on:taskDone={handleTaskDone} on:taskDelete={handleTaskDelete}/>
    {:else}
        <h5 style="text-align: center;">Click the + button below to add your first todo!</h5>
    {/each}
    <button on:click={() => {showAddTodoItem = !showAddTodoItem}} class="add-todo-btn">+</button>
    {#if showAddTodoItem}
        <AddTodoItem on:addTodoItem={addTodoItem} on:closeModal={() => showAddTodoItem = false}/>
    {/if}
</div>

<style>
.window-container{
    height: calc(100% - 50px);
    overflow: auto;
    user-select: auto;
    font-size: 20px;
    width: 60%;
    margin: 0 auto;
}

.add-todo-btn{
    border: none;
    display: block;
    width: calc(100% - 2 * 5px - 2 * 20px);
    margin: 5px;
    background: var(--color1);
    border-radius: 10px;
    margin-bottom: 10px;
    padding: 10px;
    font-size: 20px;
    color:white;
    transition: all 0.2s;
}
.add-todo-btn:hover{
    opacity: 0.8;
}
</style>
