<script>
let prompt = "~ $ ";

let inputs = [
    {
        id: 0,
        text: prompt,
        disabled: false
    },
]

function handleKeyUp(event, id) {
    if(event.key == "Enter"){
        let obj = {
            id: inputs.length,
            text: prompt,
            disabled: false,
        }
        inputs.at(-1).disabled = true;
        inputs.push(obj);
        inputs = inputs;
        setTimeout(() => {
            document.getElementById("prompt" + obj.id).focus()
        }, 20);
    }
    else if(event.key === "ArrowUp"){
        event.preventDefault();
        if(inputs.length != 1){
            // @ts-ignore
            inputs[id].text = document.getElementById("prompt" + (id - 1)).value;
            console.log(inputs[id].text);
            inputs = inputs
        }
    }
}
</script>

<div class="window-container">
    {#each inputs as input (input.id)}
        <input id={"prompt" + input.id} disabled={input.disabled} value={input.text} type="text" class="shell-prompt" on:keyup={(event) => handleKeyUp(event, input.id)} />
    {/each}
</div>

<style>
.window-container{
    height: calc(100% - 50px);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    overflow: auto;
    user-select: auto;
    font-size: 20px;
    padding: 3px;
}

.shell-prompt {
    padding: 0px;
    border: none;
    outline: none;
    font-size: 20px;
    background-color: var(--color2);
    color: white;
    width: 99.5%;
    font-family: "Ubuntu Mono";
}
</style>
