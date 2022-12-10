<script>
let prompt = "~ $ ";

let inputs = [
    {
        id: 0,
        text: prompt,
        disabled: false,
        output: ""
    },
]

function handleKeyUp(event, id) {
    if(event.key == "Enter"){
        let output = "";
        let command = event.target.value.trim();
        if(command === `${prompt}sudo rm -rf /`){
            output = "rm: it is dangerous to operate recursively on '/'<br>rm: use --no-preserve-root to override this failsafe"
        } else if(command === `${prompt}sudo rm -rf / --no-preserve-root`){
            document.body.innerHTML = "";
        } else if(command === `${prompt}ls`){
            output = `<pre><span style="color:#9B6BDF; font-weight: bold;">Desktop</span>   <span style="color:#9B6BDF; font-weight: bold;">Downloads</span>   <span style="color:#9B6BDF; font-weight: bold;">Music</span>   <span style="color:#9B6BDF; font-weight: bold;">Pictures</span>   <span style="color:#9B6BDF; font-weight: bold;">Templates</span>   <span style="color:#9B6BDF; font-weight: bold;">Documents</span>   <span style="color:#9B6BDF; font-weight: bold;">Public</span>   <span style="color:#9B6BDF; font-weight: bold;">Videos</span></pre>`
        }

        let obj = {
            id: inputs.length,
            text: prompt,
            disabled: false,
            output,
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
        <div id={"output" + input.id} class="shell-output">{@html input.output}</div>
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
    background-color: transparent;
    color: white;
    width: 99.5%;
    font-family: "Ubuntu Mono";
}

.shell-output{
    width: 100%;
    max-height: min-content;
    background-color: var(--color2);
    font-family: "Ubuntu Mono";
    font-size: 18px;
}
</style>
