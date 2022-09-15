const container = document.getElementById("container");
const dock = document.getElementById("dock");

const wallpaper_paths = [
    "assets/wallpapers/ash-edmonds-0aWZdK8nK2I-unsplash.jpg",
    "assets/wallpapers/designedbyme.png",
    "assets/wallpapers/hao-wang-pVq6YhmDPtk-unsplash.jpg",
    "assets/wallpapers/jr-korpa-9XngoIpxcEo-unsplash.jpg",
    "assets/wallpapers/pawel-czerwinski-tMbQpdguDVQ-unsplash.jpg",
    "assets/wallpapers/richard-horvath-_nWaeTF6qo0-unsplash.jpg"
];
let current_wallpaper = 0;

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
// let menu;
// container.addEventListener("mousedown", (event) => {
//     function create_menu_item(text, onclick) {
//         let li = document.createElement("li");
//         li.classList.add("menu-item");
//         li.textContent = text;
//         if (onclick) li.onclick = () => {
//             console.log("You clicked me!"); onclick()
//         };
//         return li;
//     }
//     if (event.button == 0 && menu && event.target != menu) {
//         container.removeChild(menu);
//         menu = undefined;
//     }
//     if (event.button == 0) return;

//     event.preventDefault();
//     if (!menu) {
//         menu = document.createElement("div");
//         menu.classList.add("menu");
//         // menu.innerHTML = `
//         // <li class="menu-item" onclick="eval("changeBackground()")">Change Desktop Wallpaper</li>
//         // <li class="menu-item">This is a menu</li>
//         // <li class="menu-item">This is a menu</li>
//         // `

//         let menu_item_changeBackground = create_menu_item("Change Desktop Background", changeBackground);
//         console.log(menu_item_changeBackground.onclick);

//         menu.appendChild(menu_item_changeBackground);

//         menu.style.position = "fixed";
//         menu.style.top = event.pageY + "px";
//         menu.style.left = event.pageX + "px";

//         container.appendChild(menu);
//     }
// })

container.addEventListener("mousedown", (event) => {
    let menu = document.getElementById("menu");
    if (event.button == 0 && event.target != menu) {
        menu.style.display = "none";
        return;
    }
    if (event.button == 0) return;
    menu.style.top = event.pageY + "px";
    menu.style.left = event.pageX + "px";
    menu.style.display = "block";
    menu.style.zIndex = 10;
})

function changeBackground() {
    console.log("Hello");
    container.style.backgroundImage = `url('${wallpaper_paths[++current_wallpaper % wallpaper_paths.length]}')`;
}

function new_window(title) {
    function create_titlebar_button(type, icon, onclick) {
        let btn = document.createElement("button");
        btn.classList.add("titlebar-btn");
        switch (type) {
            case "close":
                btn.classList.add("close-btn");
                break;

            case "maximize":
                btn.classList.add("maximize-btn");
                break;

            case "minimize":
                btn.classList.add("minimize-btn");
                break;
        }
        btn.onclick = onclick;
        return btn;
    }
    let window = document.createElement("div");
    window.close = () => {
        container.removeChild(window);
    }
    window.maximize = () => {
        window.style.transition = "all 0.5s";
        window.style.top = "22px";
        window.style.left = "0px";
        window.style.height = `calc(100% - 62px)`;
        window.style.width = "100%";
        console.log(window.style.transition);
        window.style.transition = "";
    }
    window.minimize = () => {
        window.style.transition = "all 0.5s";
        window.style.top = "100px";
        window.style.left = "10px";
        window.style.height = "750px";
        window.style.width = "1000px";
        window.style.transition = "";
    }
    window.classList.add("window");

    let titlebar = document.createElement("div");
    titlebar.classList.add("window-titlebar");
    titlebar.id = "titlebar";
    window.appendChild(titlebar);

    let close_btn = create_titlebar_button("close", "assets/icons/system/window-close.svg", window.close);
    let max_btn = create_titlebar_button("minimize", "assets/icons/system/window-maximize.svg", window.minimize);
    let min_btn = create_titlebar_button("maximize", "assets/icons/system/window-minimize.svg", window.maximize);

    titlebar.appendChild(close_btn);
    titlebar.appendChild(min_btn);
    titlebar.appendChild(max_btn);

    let window_title = document.createElement("div");
    window_title.classList.add("window-title");
    window_title.innerHTML = title;
    titlebar.appendChild(window_title);

    container.appendChild(window);
    dragElement(window);
}


function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "titlebar")) {
        document.getElementById(elmnt.id + "titlebar").onmousedown = dragMouseDown;
    } else {
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        // elmnt.style.transition = "";
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
