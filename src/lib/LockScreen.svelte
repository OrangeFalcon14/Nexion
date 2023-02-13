<script>
import { locked_store } from "./store/settings";

let locked = false;
locked_store.subscribe(value => locked = value)

let time = "5:00:36";
let date = "Sun Apr 1";

const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

function update_time() {
    const dateObj = new Date();
    let hours = dateObj.getHours();
    let seconds = (dateObj.getSeconds() < 10) ? `0${dateObj.getSeconds()}` : dateObj.getSeconds();
    let minutes = (dateObj.getMinutes() < 10) ? `0${dateObj.getMinutes()}` : dateObj.getMinutes();
    let am_pm = (dateObj.getHours() < 12)? "AM" : "PM";
    let day_of_month = dateObj.getDay();
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
    date = `${day} ${months[dateObj.getMonth()].slice(0, 3)} ${dateObj.getDate()}`
    time = ` ${hours}:${minutes}:${seconds}`;
}
update_time();
setInterval(update_time, 1000);

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div id="lockscreen" class:show-lockscreen={locked} on:click={() => {locked = false; locked_store.set(false)}}>
    <div class="date-time-container">
        <h1>{time}</h1>
        <h5>{date}</h5>
    </div>
</div>

<style>
#lockscreen{
    position: absolute;
    top: -100%;
    left: 0;
    height: 100%;
    width: 100%;
    backdrop-filter: blur(var(--blur));
    z-index: 15;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    user-select: none;
    transition: 0.2s ease-out;
}

h1{
    font-family: 'Ubuntu Light';
    font-size: 6rem;
    font-weight: 10;
    margin-bottom: 2rem;
}
h5{
    font-family: Ubuntu Light;
    font-size: 1rem;
}

#lockscreen.show-lockscreen{
    top: 0%;
}
</style>
