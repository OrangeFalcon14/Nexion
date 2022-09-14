window.onload = () => {
    const container = document.getElementById("container");

    // Updating time
    const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const date_time = document.getElementById("date_time");
    function update_time() {
        const date = new Date();
        let seconds = (date.getSeconds() < 10) ? `0${date.getSeconds()}` : date.getSeconds();
        let minutes = (date.getMinutes() < 10) ? `0${date.getMinutes()}` : date.getMinutes();
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
        let date_time_str = `${day} ${months[date.getMonth()].slice(0, 3)} ${date.getDate()} ${date.getHours()}:${minutes}:${seconds}`
        date_time.innerHTML = date_time_str;
    }
    update_time();
    setInterval(update_time, 1000);

    // right click menu
    container.addEventListener("contextmenu", (event) => {
        event.preventDefault();
    });
    let menu;
    container.addEventListener("mousedown", (event) => {
        if (event.button == 0 && menu && event.target != menu){
            container.removeChild(menu);
            menu = undefined;
        }
        if (event.button == 0) return;

        event.preventDefault();
        console.log(menu);
        if (!menu) {
            menu = document.createElement("div");
            menu.classList.add("menu");
            menu.innerHTML = `
            <li class="menu-item">This is a menu</li>
            <li class="menu-item">This is a menu</li>
            <li class="menu-item">This is a menu</li>
            `
            menu.style.position = "fixed";
            menu.style.top = event.pageY + "px";
            menu.style.left = event.pageX + "px";

            container.appendChild(menu);
        }
    })
}
