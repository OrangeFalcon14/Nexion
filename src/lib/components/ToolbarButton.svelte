<script>
export let text;
export let title;
</script>

<button on:click {title}>
    {text}
</button>

<style>
button{
    border-radius: 5px;
    padding: 10px;
    position: relative;
    border: 1px solid var(--accent-color);
    outline: none;
    background: var(--color2);
    color: #ccc;
    font-size: 20px;
    margin: auto 2px;
    top: 50%;
    transform: translate(0, -50%);
    transition: all 0.2s
}

button:first-of-type{
    margin-left: 1%;
}

button:hover{
    opacity: 0.75;
}
</style>
