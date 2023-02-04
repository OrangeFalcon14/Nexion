<script>
let folder_icons_array = Array(20).fill(0);
</script>

<div class="window-container">
    <div class="sidebar">
        <div class="files-sidebar-link">
             Home <br>
        </div>
        <div class="files-sidebar-link">
             Desktop <br>
        </div>
        <div class="files-sidebar-link">
             Documents <br>
        </div>
        <div class="files-sidebar-link">
             Downloads <br>
        </div>
        <div class="files-sidebar-link">
             Pictures <br>
        </div>
        <div class="files-sidebar-link">
            辶 Videos <br>
        </div>
        <div class="files-sidebar-link">
             Trash <br>
        </div>
    </div>
    <div class="main-content">
        {#each folder_icons_array as folder}
            <span class="folder-icon"></span>
        {/each}
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
}

.sidebar{
    float : left;
    height : 100%;
    width : 25%;
    max-width : 25vh;
    background-color : var(--color3);
}

.files-sidebar-link {
    user-select: none;
    padding: 7.5px;
    border-radius: 5px;
    margin: 5px;
    font-size: 18px;
}

.files-sidebar-link:hover {
    background-color: var(--color2);
}

.main-content{
    float : left;
    display : flex;
    flex-direction : row;
    flex-wrap : wrap;
    align-content : center;
    height : auto;
    width : 75%;
    max-height: 100%;
    overflow : auto;
}

.folder-icon {
    padding: 10px;
    margin: 10px;
    float: none;
    display: inline-block;
    width: 100px;
    height: 100px;
    background-image: url("/Nexion/src/assets/icons/system/folder.svg");
    /* background-image: url("../../assets/icons/system/folder.svg"); */
    background-size: cover;
    transition: opacity 0.25s;
}

.folder-icon:hover {
    opacity: 0.5;
}
</style>
