<script>
import { createEventDispatcher } from "svelte";

const dispatch = createEventDispatcher();

let batteryPercentage = "100%";

navigator.getBattery?.().then((battery) => {
    batteryPercentage = battery * 100 + "%";
})

let brightness = 100;

$:{
    document.body.style.filter = `brightness(${brightness}%)`;
}
</script>

<div id="system-menu">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="menu-item menu-button" on:click={() => dispatch("lockScreen")}></div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="menu-item menu-button" on:click={() => dispatch("newWindow", {app: "Camera", focused: true})}></div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="menu-item menu-button" on:click={() => dispatch("newWindow", {app: "Settings", focused:true})}></div>
    <div class="menu-item menu-button battery-percentage">  {batteryPercentage}</div>
    <br><br>
    <div class="menu-item brightness-control">󰃟 <input type="range" name="brightness-input" id="brightness-input" min="20" max="100" bind:value={brightness}></div>
</div>

<style>
#system-menu{
    position: fixed;
    padding: 10px;
    border-radius: 10px;
    top: 27px;
    right: 5px;
    width: var(--system-menu-width);
    min-width: var(--system-menu-width);
    height: var(--system-menu-height);
    max-height: var(--system-menu-height);
    overflow: auto;
    background-color: var(--color1);
    backdrop-filter: blur(var(--blur));
    z-index: 10;
}

#system-menu .menu-item{
    user-select: none;
    padding: 0.5rem 1rem;
}
#system-menu .menu-item:hover{
    background: var(--color2);
    filter: brightness(120%);
    border-radius: 10px;
}
#system-menu .menu-item:active,
#system-menu .menu-item:focus{
    filter:brightness(150%) saturate(70%);
}

#system-menu .brightness-control{
    display: flex;
    align-items: center;
    gap: 1rem;
}
#system-menu .brightness-control input[type="range"]{
    width: 100%;
}

#system-menu .menu-item.menu-button{
    display: inline-block;
    width: fit-content;
    background: var(--color3);
    backdrop-filter: brightness(400%);
    border-radius: 10px;
    padding: 0.75rem;
}
#system-menu .menu-item.menu-button.battery-percentage{
    float: right;
}
</style>
