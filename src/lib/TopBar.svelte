<script>
import ApplicationsMenu from "./ApplicationsMenu.svelte";
import SystemMenu from "./SystemMenu.svelte";

let date_time;

const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

function update_time() {
    const date = new Date();
    let hours = date.getHours();
    let seconds = (date.getSeconds() < 10) ? `0${date.getSeconds()}` : date.getSeconds();
    let minutes = (date.getMinutes() < 10) ? `0${date.getMinutes()}` : date.getMinutes();
    let am_pm = (date.getHours() < 12)? "AM" : "PM";
    let day_of_month = date.getDay();
    let day;
    switch (day_of_month) {
        case 0:
            day = "Sun";
            break;
        case 1:
            day = "Mon";
            break;
        case 2:
            day = "Tue";
            break;
        case 3:
            day = "Wed";
            break;
        case 4:
            day = "Thu";
            break;
        case 5:
            day = "Fri";
            break;
        case 6:
            day = "Sat";
            break;
    }
    date_time = `${day} ${months[date.getMonth()].slice(0, 3)} ${date.getDate()} ${hours}:${minutes}:${seconds}`;
}
update_time();
setInterval(update_time, 1000);

export let applications_menu_show = false;

let system_menu_show = false;
</script>

<div id="topbar">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <span id="applications-menu-launcher" on:click={() => {applications_menu_show = !applications_menu_show}}>Applications</span>
    <span id="date-time">{date_time}</span>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <span id="sys-tray" on:click={() => {system_menu_show = !system_menu_show}}>    </span>
    
</div>
{#if applications_menu_show}
    <ApplicationsMenu on:closeApplicationsMenu={() => {applications_menu_show = false}} />
{/if}
{#if system_menu_show}
    <SystemMenu on:closeSystemMenu={() => system_menu_show = false} />
{/if}

<style>
#topbar {
    user-select: none;
    font-size: 0.95em;
    z-index: 10;
    height: 22px;
    width: 100%;
    position: fixed;
    top: 0;
    background-color: var(--color1);
    overflow: hidden;
    backdrop-filter: blur(var(--blur));
}

#date-time {
    user-select: none;
    position: inherit;
    left: 50%;
    transform: translate(-50%, 0);
}

#sys-tray {
    user-select: none;
    font-family: NerdFontSymbols;
    position: inherit;
    right: 0;
    padding-right: 0.5%;
}

#topbar span{
    padding-inline: 1rem;
    border-radius: 1rem;
    height: 100%;
}

#topbar span:hover{
    background: #404040;
}
</style>
