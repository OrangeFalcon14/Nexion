<script>
let dockStyle = localStorage.getItem("dockStyle") || "panel-dock";

$:{
        console.log(dockStyle);
        document.querySelector("#dock").classList.remove(dockStyle == "compact-dock" ? "panel-dock" : "compact-dock");
        document.querySelector("#dock").classList.add(dockStyle == "compact-dock" ? "compact-dock" : "panel-dock");
        localStorage.setItem("dockStyle", dockStyle);
}

</script>
<label for="dock-style-selector">Dock Style</label>
<select name="dock-style-selector" bind:value={dockStyle} id="dock-style-selector">
    <option value="panel-dock">Panel (Full width)</option>
    <option value="compact-dock">Compact (MacOS style)</option>
</select>
