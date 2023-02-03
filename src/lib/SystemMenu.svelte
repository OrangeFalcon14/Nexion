<script>
import { createEventDispatcher } from "svelte";

const dispatch = createEventDispatcher();
</script>

<div id="system-menu">
    <div class="menu-item" on:click={() => dispatch("lockScreen")}> Lock</div>
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
</style>
