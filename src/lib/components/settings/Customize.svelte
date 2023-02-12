<script>
import { getContext } from "svelte";
import { getCSSVar, setCSSVar } from "../../utils/misc"

let dockStyle = localStorage.getItem("dockStyle") || "panel-dock";

$: {
        console.log(dockStyle);
        document.querySelector("#dock").classList.remove(dockStyle == "compact-dock" ? "panel-dock" : "compact-dock");
        document.querySelector("#dock").classList.add(dockStyle == "compact-dock" ? "compact-dock" : "panel-dock");
        localStorage.setItem("dockStyle", dockStyle);
}

let colorConfig = getContext("colorConfig") || {};
let defaultCSSVars = getContext("defaultCSSVars");

let color1 = colorConfig["--color1"] || "#060610ae";
let color2 = colorConfig["--color2"] || "#161620cf";
let color3 = colorConfig["--color3"] || "#111118cf";
let accentColor = colorConfig["--accent-color"] || "#736099";
let blur = colorConfig["--blur"] || 20;

$: {
    setCSSVar("--color1", color1);
    setCSSVar("--color2", color2);
    setCSSVar("--color3", color3);
    setCSSVar("--accent-color", accentColor);
    setCSSVar("--blur", blur + "px");

    localStorage.setItem("colorConfig", JSON.stringify({
        "--color1" : color1,
        "--color2" : color2,
        "--color3" : color3,
        "--accent-color" : accentColor,
        "--blur" : blur,
    }))
}

function resetToDefaults() {
    color1 = defaultCSSVars["--color1"];
    color2 = defaultCSSVars["--color2"];
    color3 = defaultCSSVars["--color3"];
    accentColor = defaultCSSVars["--accent-color"];
    blur = defaultCSSVars["--blur"];
    setCSSVar("--color1", defaultCSSVars["--color1"]);
    setCSSVar("--color2", defaultCSSVars["--color2"]);
    setCSSVar("--color3", defaultCSSVars["--color3"]);
    setCSSVar("--accent-color", defaultCSSVars["--accent-color"]);
    setCSSVar("--blur", defaultCSSVars["--blur"] + "px");
}

function exportSettings() {
    let settings = JSON.stringify({
        "--color1" : color1,
        "--color2" : color2,
        "--color3" : color3,
        "--accent-color" : accentColor,
        "--blur" : blur,
    });
    let a = document.createElement('a');
    let blob = new Blob([settings], { 'type': "text/json" });
    a.href = window.URL.createObjectURL(blob);
    a.download = "nexionConfig.json";
    a.click();
}

function importSettings(){
    let reader = new FileReader();
    if (typeof (files[0]) == 'undefined') {
        // @ts-ignore
        document.querySelector("label [for='config_import']").click();
        return;
    }
    reader.onload = () => {
        try{
            // @ts-ignore
            let importedConfig = JSON.parse(reader.result);
            setCSSVar("--color1", importedConfig["--color1"]);
            setCSSVar("--color2", importedConfig["--color2"]);
            setCSSVar("--color3", importedConfig["--color3"]);
            setCSSVar("--accent-color", importedConfig["--accent-color"]);
            setCSSVar("--blur", importedConfig["--blur"] + "px");
            showErrorModal = false;
        }catch (e){
            showErrorModal = true;
        }
    }
    reader.readAsText(files[0])
}
let files;
let showErrorModal = false;
</script>
<div class="customize-container">
    <label for="dock-style-selector">Dock Style</label>
    <select name="dock-style-selector" bind:value={dockStyle} id="dock-style-selector">
        <option value="panel-dock">Panel (Full width)</option>
        <option value="compact-dock">Compact (MacOS style)</option>
    </select>
    <br>
    <label for="--color1">Color 1 <br>
        <span class="desc">Window titlebars, applications menu, dock, topbar and other system components</span></label>
    <input bind:value={color1} type="color" name="--color1" id="--color1" />
    <br>
    <label for="--color2">Color 2 <br>
        <span class="desc">Window background</span></label>
    <input bind:value={color2} type="color" name="--color2" id="--color2" />
    <br>
    <label for="--color3">Color 3 <br>
        <span class="desc">Misc. components</span></label>
    <input bind:value={color3} type="color" name="--color3" id="--color3" />
    <br>
    <label for="--accent-color">Accent Color <br>
        <span class="desc">Accent color used for borders, buttons, etc</span></label>
    <input bind:value={accentColor} type="color" name="--accent-color" id="--accent-color" />
    <br>
    <label for="--blur">Blur<br>
        <span class="desc">Window backgrounds, system components</span></label>
        <input bind:value={blur} type="range" min="0" max="100" name="--blur" id="--blur" />
    <br>
    <div class="import-export-btns-container">
        <button on:click={exportSettings} class="import-export-btns"> Export settings</button>
        <label for="config_import" class="import-export-btns"> Import settings</label>
        <input bind:files={files} on:change={importSettings} type="file" id="config_import" style="display: none" />
    </div>
    <button on:click={resetToDefaults}>勒 Reset</button>    
    {#if showErrorModal}
        <div class="error-container">
            <p>The file is not a valid Nexion config file!</p>
        </div>
    {/if}
</div>

<style>
.customize-container{
    display: grid;
    grid-template-columns: 70% 1fr;
    row-gap: 1rem;
}
label{
    font-size: 20px;
    grid-column: 1;
}
label .desc{
    color: #bbb;
    font-size: 15px;
}
button{
    grid-column: 2;
    grid-row: 13;
}
button, label[for="config_import"]{
    background: var(--color1);
    border: 2px solid transparent;
    outline: none;
    padding: 10px;
    border-radius: 10px;
    text-align: center;
    color: white;
    font-size: 15px;
    transition: 0.2s all ease-in;    
    display: inline;
    font-family: inherit;
}
button:hover{
    opacity: 0.8;
}
button:active, button:focus{
    border: 2px solid var(--accent-color);
}
.import-export-btns-container{
    grid-column: 1;
    grid-row: 13;
}
.error-container{
    color: #ff2946;
    font-size: 15px;
    grid-column: 1;
    grid-row: 14;
}
.error-container p{
    margin: 0.25rem;
}
</style>
