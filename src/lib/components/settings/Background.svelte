<script>
import { wallpaper_paths_store } from "../../store/settings";
import AddBackgroundModal from "./AddBackgroundModal.svelte";
import BackgroundThumbnail from "./BackgroundThumbnail.svelte";

let wallpaperPaths = JSON.parse(localStorage.getItem("wallpaperPaths")) || $wallpaper_paths_store;

let currentWallpaper = localStorage.getItem("currentWallpaper") || wallpaperPaths.at(0);

$: changeBackground({detail: currentWallpaper});

function changeBackground(event) {
    if(event.detail.from === "modal"){
        if(event.detail.type === "url"){
            wallpaperPaths.push(event.detail.url);
            wallpaperPaths = wallpaperPaths;
            
            currentWallpaper = wallpaperPaths.at(-1);
            // @ts-ignore
            document.querySelector("#container").style.backgroundImage = `url(${currentWallpaper})`;
            
            localStorage.setItem("currentWallpaper", currentWallpaper);
            localStorage.setItem("wallpaperPaths", JSON.stringify(wallpaperPaths));
            console.log(localStorage.getItem("currentWallpaper"), localStorage.getItem("wallpaperPaths"));
            showModal = false;
        }else if(event.detail.type === "image"){
            const reader = new FileReader();
            if(typeof event.detail.images[0] === undefined) return;
            reader.readAsDataURL(event.detail.images[0])
            reader.onload = () => {
                wallpaperPaths.push(reader.result);
                wallpaperPaths = wallpaperPaths;
                
                currentWallpaper = wallpaperPaths.at(-1);
                // @ts-ignore
                document.querySelector("#container").style.backgroundImage = `url(${currentWallpaper})`;
                
                localStorage.setItem("currentWallpaper", currentWallpaper);
                localStorage.setItem("wallpaperPaths", JSON.stringify(wallpaperPaths));
                console.log(localStorage.getItem("currentWallpaper"), localStorage.getItem("wallpaperPaths"));
                showModal = false;
            }
        }
        return;
    }
    let wallpaper = wallpaperPaths.at(wallpaperPaths.indexOf(event.detail));
    
    // @ts-ignore
    document.querySelector("#container").style.backgroundImage = `url(${wallpaper})`;
    currentWallpaper = wallpaper;
    
    localStorage.setItem("currentWallpaper", currentWallpaper)
}
let showModal = false;
</script>

<div class="current-wallpaper">
    <BackgroundThumbnail path={currentWallpaper}/>
</div>
<div class="background-container">
    {#each wallpaperPaths as wallpaper}
        <BackgroundThumbnail path={wallpaper} on:changeBackground={changeBackground} />
    {/each}
    <button on:click={() => showModal = true}>+</button>
</div>
<AddBackgroundModal bind:showModal on:changeBackground={changeBackground}></AddBackgroundModal>

<style>
.current-wallpaper{
    padding: 1rem 10rem 3rem 10rem;
}
.background-container{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
}
button{
    background: var(--color1);
    border: 2px solid transparent;
    outline: none;
    padding: 10px;
    border-radius: 10px;
    text-align: center;
    color: #ddd;
    font-size: 2rem;
    transition: 0.2s all ease-in;    
    display: inline;
}
button:hover{
    opacity: 0.8;
}
button:active, button:focus{
    border: 2px solid var(--accent-color);
}
</style>
