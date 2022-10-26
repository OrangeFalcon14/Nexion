<script>
export let show_modal = false;
</script>

{#if show_modal}
    <div class="backdrop">
        <div class="modal">
            <slot></slot>
            <button on:click={() => show_modal = false}>Close</button>
        </div>
    </div>
{/if}
<style>
.backdrop{
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    opacity: 0.5;
    background: #000;
}
.modal{
    position: relative;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
    height: auto;
    max-height: 60%;
    opacity: 1;
}
</style>
