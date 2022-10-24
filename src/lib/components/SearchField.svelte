<script>
import { createEventDispatcher } from "svelte";

export let apps_list;

const dispatch = createEventDispatcher()

let search_val = ""

$: search_string = search_val.trim().toLocaleLowerCase();

function is_substring(string1, string2) {
    return string1.indexOf(string2) != -1;
}

function handleKeyPress(event){
    if(event.key == "Escape"){
        dispatch("closeApplicationMenu");
        return;
    }
    if (search_string == ""){
        dispatch("showApps", apps_list);
    }
    let shownApps = [];
    for(let app of apps_list){
        if(is_substring(app.toLowerCase(), search_string)){
            shownApps.push(app);
        }
    }
    dispatch("showApps", shownApps);
}

</script>

<input type="text" id="applications-menu-search" placeholder="Search..." bind:value={search_val} on:keyup={handleKeyPress} />

<style>
#applications-menu-search {
    color: white;
    font-size: 15px;
    border: none;
    outline: none;
    background-color: var(--color2);
    border-radius: 10px;
    padding: 10px;
    width: calc(100% - 20px);
}
</style>
