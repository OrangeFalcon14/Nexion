const container = document.getElementById("container");
const dock = document.getElementById("dock");
const applications_menu = document.getElementById("applications-menu");
if (applications_menu.style.display == "") { applications_menu.style.display = "none"; console.log(applications_menu.style.display); }
const apps_container = document.getElementById("apps-container");
const notifications_calendar_dropdown = document.getElementById("notifications-calendar-dropdown");
const calendar = document.getElementById("calendar");
if (notifications_calendar_dropdown.style.display == "") { notifications_calendar_dropdown.style.display = "none"; }

const wallpaper_paths = [
    "assets/wallpapers/ash-edmonds-0aWZdK8nK2I-unsplash.jpg",
    "assets/wallpapers/designedbyme.png",
    "assets/wallpapers/hao-wang-pVq6YhmDPtk-unsplash.jpg",
    "assets/wallpapers/jr-korpa-9XngoIpxcEo-unsplash.jpg",
    "assets/wallpapers/pawel-czerwinski-tMbQpdguDVQ-unsplash.jpg",
    "assets/wallpapers/richard-horvath-_nWaeTF6qo0-unsplash.jpg",
    "assets/wallpapers/shapelined-_JBKdviweXI-unsplash.jpg",
    "assets/wallpapers/wladislaw-sokolowskij-0vw4InAC-yM-unsplash.jpg"
];
let current_wallpaper = 0;

let open_windows = [];
let focused_window;
let time_format = "AM/PM";

// Updating time
const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
const date_time = document.getElementById("date_time");
function update_time() {
    const date = new Date();
    let hours = (time_format == "24-Hour")? date.getHours(): date.getHours() - 12;
    let seconds = (date.getSeconds() < 10) ? `0${date.getSeconds()}` : date.getSeconds();
    let minutes = (date.getMinutes() < 10) ? `0${date.getMinutes()}` : date.getMinutes();
    let am_pm = (date.getHours() < 12)? "AM" : "PM";
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
    let date_time_str = (time_format == "24-Hour")?`${day} ${months[date.getMonth()].slice(0, 3)} ${date.getDate()} ${hours}:${minutes}:${seconds}`: `${day} ${months[date.getMonth()].slice(0, 3)} ${date.getDate()} ${hours}:${minutes}:${seconds} ${am_pm}`
    date_time.innerHTML = date_time_str;
}
update_time();
setInterval(update_time, 1000);

// right click menu
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
}, false);

container.addEventListener("mousedown", (event) => {
    // if(event.target != applications_menu)applications_menu.style.display = "none";

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
    if (applications_menu.style.display == "block") toggle_applications_menu();
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
    if (title == "Files") create_files_window(window);
    if (title == "Text Editor") create_text_editor_window(window);
    if (title == "Settings") create_settings_window(window);

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
    alacritty_container.style.userSelect = "auto";
    alacritty_container.style.fontSize = "20px";
    alacritty_container.style.height = "100%";
    alacritty_container.style.maxHeight = "calc(100% - 65px)";
    alacritty_container.style.width = "100%";
    alacritty_container.style.overflow = "auto";

    let prev_prompt;

    function new_prompt() {
        if (prev_prompt) prev_prompt.disabled = "true";
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

function create_files_window(window) {
    let files_container = document.createElement("div");
    files_container.style.userSelect = "auto";
    files_container.style.fontSize = "20px";
    files_container.style.height = "100%";
    files_container.style.maxHeight = "calc(100% - 50px)";
    files_container.style.borderRadius = "0px 0px 10px 10px";
    // files_container.style.width = "calc(100% - 10px)";
    files_container.style.width = "100%";
    files_container.style.overflow = "auto";

    let sidebar = document.createElement("div");
    sidebar.style.float = "left";
    sidebar.style.height = "100%";
    sidebar.style.width = "25%";
    sidebar.style.maxWidth = "25vh";
    sidebar.style.backgroundColor = "var(--color3)";

    let links_titles = [" Home", " Desktop", " Documents", " Downloads", " Pictures", "辶 Videos", " Trash"];
    for (let link_title of links_titles) {
        let link = document.createElement("div");
        link.innerHTML = `${link_title}`;
        link.classList.add("files-sidebar-link");
        sidebar.appendChild(link);
    }

    files_container.appendChild(sidebar);

    let files_display_area = document.createElement("div");
    files_display_area.style.float = "left"
    files_display_area.style.display = "flex";
    files_display_area.style.flexDirection = "row";
    files_display_area.style.flexWrap = "wrap";
    files_display_area.style.alignContent = "center";
    files_display_area.style.height = "auto";
    files_display_area.style.width = "75%";
    // files_display_area.style.minWidth = "75%";
    // files_display_area.style.maxWidth = "75vh";
    files_display_area.style.overflow = "auto";

    for (let i = 0; i < 20; i++) {
        let folder_icon = document.createElement("span");
        folder_icon.style.height = folder_icon.style.width = "100px";
        folder_icon.classList.add("folder-icon");

        files_display_area.appendChild(folder_icon);

    }
    files_container.appendChild(files_display_area);

    window.appendChild(files_container);
}

function create_text_editor_window(window) {
    let text_editor_container = document.createElement("div");
    text_editor_container.style.userSelect = "auto";
    text_editor_container.style.fontSize = "20px";
    text_editor_container.style.height = "100%";
    text_editor_container.style.maxHeight = "calc(100% - 50px)";
    text_editor_container.style.width = "100%";
    text_editor_container.style.overflow = "auto";

    let textarea = document.createElement("div");
    textarea.contentEditable = "true";
    textarea.style.height = "calc(100% - 10px)";
    textarea.style.maxHeight = "calc(100% - 10px)";
    textarea.style.width = "calc(100% - 10px)";
    textarea.style.border = "none";
    textarea.style.outline = "none";
    textarea.style.float = "left";
    textarea.style.padding = "5px";
    textarea.style.overflow = "auto";

    text_editor_container.appendChild(textarea);

    window.appendChild(text_editor_container);
}

function create_settings_window(window) {
    let settings_container = document.createElement("div");
    settings_container.style.userSelect = "auto";
    settings_container.style.fontSize = "20px";
    settings_container.style.height = "100%";
    settings_container.style.maxHeight = "calc(100% - 50px)";
    settings_container.style.width = "100%";
    settings_container.style.overflow = "auto";
    settings_container.style.padding = "10px";
    // settings_container.style.textAlign = "center";
    

    let time_format_container = document.createElement("div");

    let time_format_label = document.createElement("label");
    time_format_label.innerHTML = "Time Format: ";
    time_format_label.htmlFor = "time_format_selector";
    time_format_container.appendChild(time_format_label);
    
    let time_format_selector = document.createElement("select");
    time_format_selector.name = "time_format_selector";
    time_format_selector.id = "time_format_selector";
    time_format_selector.onchange = () => {
        time_format = time_format_selector.value;
        update_time();
    }
    time_format_container.appendChild(time_format_selector)
    
    let am_pm_option = document.createElement("option");
    am_pm_option.value = "AM/PM";
    am_pm_option.innerHTML = "AM/PM";
    time_format_selector.appendChild(am_pm_option);
    let twentyfourhour_option = document.createElement("option");
    twentyfourhour_option.value = "24-Hour";
    twentyfourhour_option.innerHTML = "24-Hour";
    time_format_selector.appendChild(twentyfourhour_option);

    settings_container.appendChild(time_format_container);

    let theme_selector_container = document.createElement("div");

    let theme_selector_label = document.createElement("label");
    theme_selector_label.innerHTML = "Theme: ";
    theme_selector_label.htmlFor = "theme_selector";
    theme_selector_container.appendChild(theme_selector_label);
    
    let theme_selector = document.createElement("select");
    theme_selector.name = "theme_selector";
    theme_selector.id = "theme_selector";
    theme_selector.onclick = () => {
        if (theme_selector.value == "Dark"){
            if(document.body.classList.contains("light")){
                document.body.classList.remove("light");
            }
        }
        else if (theme_selector.value == "Light"){
            if(!document.body.classList.contains("light")){
                document.body.classList.add("light");
            }
        }
        
    }
    if (document.body.classList.contains("light")){
        theme_selector.value = "Light";
    }

    theme_selector_container.appendChild(theme_selector)
    
    let dark_option = document.createElement("option");
    dark_option.value = "Dark";
    dark_option.innerHTML = "Dark";
    theme_selector.appendChild(dark_option);
    let light_option = document.createElement("option");
    light_option.value = "Light";
    light_option.innerHTML = "Light";
    theme_selector.appendChild(light_option);

    settings_container.appendChild(theme_selector_container);


    let dock_style_container = document.createElement("div");

    let dock_style_label = document.createElement("label");
    dock_style_label.innerHTML = "Dock Style: ";
    dock_style_label.htmlFor = "dock_style_selector";
    dock_style_container.appendChild(dock_style_label);
    
    let dock_style_selector = document.createElement("select");
    dock_style_selector.name = "dock_style_selector";
    dock_style_selector.id = "dock_style_selector";
    dock_style_selector.onchange = () => {
        if(dock.classList.contains("panel-dock")){
            dock.classList.remove("panel-dock");
            dock.classList.add("compact-dock");
        }else if(dock.classList.contains("compact-dock")){
            dock.classList.remove("compact-dock");
            dock.classList.add("panel-dock");
        }

    }
    dock_style_container.appendChild(dock_style_selector)
    
    let default_option = document.createElement("option");
    default_option.value = "Default";
    default_option.innerHTML = "Default";
    dock_style_selector.appendChild(default_option);
    let compact_option = document.createElement("option");
    compact_option.value = "Compact";
    compact_option.innerHTML = "Compact";
    dock_style_selector.appendChild(compact_option);

    settings_container.appendChild(dock_style_container);

    window.appendChild(settings_container);
}

function toggle_applications_menu() {
    for (let i of document.getElementById("apps-container").children) i.style.display = "block";
    if (applications_menu.style.display == "block") {
        applications_menu.style.display = "none";
        applications_menu.style.maxHeight = "0";
    } else if (applications_menu.style.display == "none") {
        applications_menu.style.display = "block";
        applications_menu.style.maxHeight = "var(--app-menu-height)";
    }
    document.getElementById("applications-menu-search").focus();

}

function is_substring(string1, string2) {
    return string1.indexOf(string2) != -1;
}

document.getElementById("applications-menu-search").onkeyup = (event) => {
    if (event.key == "Escape") {
        toggle_applications_menu();
        return;
    }
    let search_string = document.getElementById("applications-menu-search").value.toLowerCase();
    let apps_list = document.getElementById("apps-container").children;
    if (search_string == "") {
        for (let app of apps_list) {
            app.style.display = "block";
        }
        return;
    }
    for (let app of apps_list) {
        let name = app.title.toLowerCase();
        if (!is_substring(name, search_string)) {
            app.style.display = "none";
        } else {
            app.style.display = "block";
        }
    }

}

function toggle_notifications_calendar_dropdown() {
    if (notifications_calendar_dropdown.style.display == "block") {
        notifications_calendar_dropdown.style.display = "none";
    } else if (notifications_calendar_dropdown.style.display == "none") {
        notifications_calendar_dropdown.style.display = "block";
    }
}

/* function create_calendar(){
    let date = 1;
    calendar.innerHTML = "<br>"
    for (let i = 0; i < 6; i++) {
        for(let j = 0; j < 5; j ++){
            let day = document.createElement("span");
            day.classList.add("day");
            // if(date < 10)date = "0" + date;
            if(date < 10) day.innerHTML = "0" + date;
            else day.innerHTML = date;
            calendar.appendChild(day);
            date += 1;
        }
        calendar.innerHTML += "<br>";
    }
} */
/* function create_calendar(){
    let date = 1;
    calendar.innerHTML = "<br>";
    for (let i = 0; i < 6; i++) {
        for(let j = 0; j < 5; j ++){
            let day = document.createElement("div");
            day.classList.add("day");

            day.style.gridColumnStart = j;
            day.style.gridColumnEnd = j + 1;
            day.style.gridRowStart = i;
            day.style.gridRowEnd = i + 1;

            if(date < 10) day.innerHTML = "0" + date;
            else day.innerHTML = date;
            calendar.appendChild(day);
            date += 1;
        }
    }
}
create_calendar();
 */
