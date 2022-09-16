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

let open_windows = [];
let focused_window;

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
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
}, false);

container.addEventListener("mousedown", (event) => {
    if (event.target != container) return;
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

    open_windows.push(window);
    window.id = open_windows.length;
    focus_window(window);

    window.close = () => {
        container.removeChild(window);
    }
    window.maximize = () => {
        window.style.transition = "all 0.5s";
        window.style.top = "22px";
        window.style.left = "0px";
        window.style.height = `calc(100% - 62px)`;
        window.style.width = "100%";
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
    window.onclick = () => {
        focus_window(window);
    }
    window.classList.add("window");

    let titlebar = document.createElement("div");
    titlebar.classList.add("window-titlebar");
    titlebar.id = window.id + "titlebar";
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

    if (title == "Alacritty") create_alacritty_window(window);

    container.appendChild(window);
    dragElement(window);
}

function focus_window(window) {
    focused_window = window;

    for (let x of open_windows) {
        x.style.opacity = "0.8";
        x.style.zIndex = "5";
    }
    focused_window.style.opacity = "1";
    focused_window.style.zIndex = "6";
    console.log(window);
}


function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "titlebar")) {
        document.getElementById(elmnt.id + "titlebar").onmousedown = dragMouseDown;
    } else {
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        focus_window(elmnt);
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

function create_alacritty_window(window) {
    let alacritty_container = document.createElement("div");
    alacritty_container.style.padding = "5px";
    alacritty_container.style.userSelect = "auto";
    alacritty_container.style.fontSize = "20px";
    alacritty_container.style.height = "100%";
    alacritty_container.style.maxHeight = "calc(100% - 65px)";
    alacritty_container.style.width = "100%";
    alacritty_container.style.overflow = "auto";

    let prev_prompt;

    function new_prompt() {
        if(prev_prompt)prev_prompt.disabled = "true";
        let prompt = document.createElement("input");
        prompt.classList.add("shell-prompt");
        prompt.type = "text";
        prompt.value = "[~] $ ";
        prompt.addEventListener("keydown", (event) => {
            if (event.key == "Enter") {
                new_prompt();
            }
        });
        alacritty_container.appendChild(prompt);
        prompt.focus();
        prev_prompt = prompt;
    }

    new_prompt();

    window.appendChild(alacritty_container);
}
