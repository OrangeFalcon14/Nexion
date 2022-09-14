window.onload = () => {
    // Updating time
    const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const date_time = document.getElementById("date_time");
    function update_time() {
        const date = new Date();
        let seconds = (date.getSeconds() < 10) ? `0${date.getSeconds()}` : date.getSeconds();
        let day = date.getDay();
        switch (day) {
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
        let date_time_str = `${day} ${months[date.getMonth()].slice(0, 3)} ${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${seconds}`
        date_time.innerHTML = date_time_str;
    }
    update_time();
    setInterval(update_time, 1000);
}
