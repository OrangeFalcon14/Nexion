<script>
import { getContext } from "svelte";

let dockStyle = localStorage.getItem("dockStyle") || "panel-dock";

$: {
        console.log(dockStyle);
        document.querySelector("#dock").classList.remove(dockStyle == "compact-dock" ? "panel-dock" : "compact-dock");
        document.querySelector("#dock").classList.add(dockStyle == "compact-dock" ? "compact-dock" : "panel-dock");
        localStorage.setItem("dockStyle", dockStyle);
}

let colorConfig = getContext("colorConfig") || {};

let color1 = colorConfig["--color1"] || "#060610ae";
let color2 = colorConfig["--color2"] || "#161620cf";
let color3 = colorConfig["--color3"] || "#111118cf";
let accentColor = colorConfig["--accent-color"] || "#736099";
let blur = colorConfig["--blur"] || 20;

const setCSSVar = getContext("setCSSVar");
const getCSSVar = getContext("getCSSVar");

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
</style>
