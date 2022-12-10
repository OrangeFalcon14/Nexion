<script>
import { getContext } from "svelte";

let video_id = getContext("window_id") + "video";

let permission_granted = false;

navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
        width: 1000,
        height: 560,
    },
}).then( media_stream => {
    permission_granted = true;
    let video = document.getElementById(video_id);
    console.log(video_id);
    // @ts-ignore
    video.srcObject = media_stream;
    video.onloadedmetadata = () => {
        // @ts-ignore
        video.play();
    }
}).catch( error => {
    console.log(error);
})

const take_photo = () => {
    let video = document.getElementById(video_id);
    const canvas = document.createElement("canvas");
    // @ts-ignore
    canvas.width = video.videoWidth;
    // @ts-ignore
    canvas.height = video.videoHeight;
    
    const context = canvas.getContext("2d");
    // @ts-ignore
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    let a = document.createElement("a");
    canvas.toBlob((blob) => {
        a.href = URL.createObjectURL(blob);
        a.download = "picture.png";
        a.click();
    })
}
</script>

<div class="window-container">
    <div class="video-container">
        <!-- svelte-ignore a11y-media-has-caption -->
        <video id={video_id} />
        {#if !permission_granted}
            <div class="grant-permission">
                <h2>Click "Allow" in the browser prompt to use your camera.</h2>
            </div>
        {/if}
    </div>
    <div class="controls">
        <button class="photo-btn" on:click={take_photo}></button>
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

.video-container{
    width: 100%;
    height: 80%;
}
.video-container video{
    height: 100%;
    width: 100%;
    transform: scale(-1, 1);
}

.grant-permission{
    position: absolute;
    top:0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: #aaa;
}

.controls{
    background: var(--color3);
    height: 20%;
}
.controls .photo-btn{
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border: 2px solid var(--accent-color);
    background: var(--color1);
    padding: 20px 23px;
    color: #aaa;
    font-size: 40px;
    border-radius: 50%;
    transition: opacity 0.2s;
}
.controls .photo-btn:hover{
    opacity: 0.75;
}
</style>
