<script>
import Dock from './lib/Dock.svelte';
import Window from './lib/Window.svelte';
let apps_list = ["Files", "Firefox", "Alacritty", "Pycharm Community Edition", "Visual Studio Code"];
</script>

<div id="container">
    <Dock {apps_list}/>
</div>
