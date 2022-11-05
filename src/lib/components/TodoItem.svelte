<script>
export let title;
export let content;

let toggle_btn_content = "+";
let showContent = false;

const toggleContent = () => {
    showContent = !showContent;
    if(showContent) toggle_btn_content = "-";
    else toggle_btn_content = "+";
}
</script>

<div class="todo-item">
    <div class="title" on:click={toggleContent}>
        <h4>{title}</h4>
        <span class="toggle-btn">{toggle_btn_content}</span>
    </div>
    <div class="content-container" class:show={showContent}>
        <div class="content">
            {@html content}
        </div>
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
    background: var(--color2);
    border-radius: 10px;
}
.content-container:active{
    max-height: fit-content;
}
.show{
    margin-top: 5px;
    padding: 10px;
    display:block;
    max-height: fit-content;
    border: 5px solid var(--color1);
    border-top: none;
}
.content{
    max-height: 300px;
    overflow: auto;
}
</style>
