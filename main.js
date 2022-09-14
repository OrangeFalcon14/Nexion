const container = document.getElementById("container");

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
