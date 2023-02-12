import { readable, writable } from "svelte/store";

export const windows_store = writable([]);
export const window_ids_store = writable([]);
export const dock_apps_store = writable([
    {
        name: "Files",
        running: false,
        focused: false,
    },
    {
        name: "Firefox",
        running: false,
        focused: false,
    },
    {
        name: "Alacritty",
        running: false,
        focused: false,
    },
    {
        name: "Pycharm Community Edition",
        running: false,
        focused: false,
    },
    {
        name: "Visual Studio Code",
        running: false,
        focused: false,
    },
]);


export const appsList = readable(["Files", "Firefox", "Asteroids", "Alacritty", "Camera", "Pycharm Community Edition", "Settings", "Text Editor", "Todo", "Visual Studio Code"])
