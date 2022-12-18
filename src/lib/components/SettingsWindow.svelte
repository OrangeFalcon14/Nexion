<script>
import Customize from "./settings/Customize.svelte";
import Background from "./settings/Background.svelte";

let content = "Customize";
</script>
<div class="window-container">
    <div class="sidebar">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="sidebar-link" on:click={() => content = "Customize"} class:active={content === "Customize"}>
             Customize
        </div>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="sidebar-link" on:click={() => content = "Background"} class:active={content === "Background"}>
             Background
        </div>
    </div>
    <div class="main-content">
        {#if content === "Customize"}
            <Customize />
        {:else if content === "Background"}
            <Background />
        {/if}
    </div>
</div>
<style>
.window-container{
    height: calc(100% - 50px);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    overflow: auto;
    user-select: auto;
    font-size: 20px;
    padding: 0px;
    display: grid;
    grid-template-columns: 25vh 1fr;
}

.sidebar{
    height : 100%;
    background-color : var(--color3);
}

.sidebar-link {
    user-select: none;
    padding: 0.75rem 1.25rem;
    border-radius: 5px;
    margin: 5px;
    font-size: 18px;
}

.sidebar-link.active{
    background: var(--accent-color);
}
.sidebar-link:hover{
    backdrop-filter: brightness(175%);
}

.main-content{
    height : auto;
    max-height: 100%;
    overflow : auto;
    padding: 2rem;
}
</style>
