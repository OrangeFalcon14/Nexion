<script>
// let date_time = {};

// const months = ["January", "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December"
// ];

// function update_time() {
//     const date = new Date();
//     date_time.hours = date.getHours();
//     date_time.seconds = (date.getSeconds() < 10) ? `0${date.getSeconds()}` : date.getSeconds();
//     date_time.minutes = (date.getMinutes() < 10) ? `0${date.getMinutes()}` : date.getMinutes();
//     date_time.am_pm = (date.getHours() < 12)? "AM" : "PM";
    
//     let day = date.getDay();
//     switch (day) {
//         case 0:
//             date_time.day = "Sun";
//             break;
//         case 1:
//             date_time.day = "Mon";
//             break;
//         case 2:
//             date_time.day = "Tue";
//             break;
//         case 3:
//             date_time.day = "Wed";
//             break;
//         case 4:
//             date_time.day = "Thu";
//             break;
//         case 5:
//             date_time.day = "Fri";
//             break;
//         case 6:
//             date_time.day = "Sat";
//             break;
//     }
//     date_time = {...date_time};
//     let date_time_str = `${date_time.day} ${months[date.getMonth()].slice(0, 3)} ${date.getDate()} ${date_time.hours}:${date_time.minutes}:${date_time.seconds}`;
// }

// update_time();
// setInterval(update_time, 1000);

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
</script>

<div id="topbar">
    <span id="date-time">{date_time}</span>
    <div id="sys-tray">  </div>

</div>

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
    padding-right: 1%;
}
</style>
