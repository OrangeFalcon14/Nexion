import { windows_store, dock_apps_store } from "../store/core";

let windows, dock_apps;

windows_store.subscribe(value => windows = value)
dock_apps_store.subscribe(value => dock_apps = value)

export function closeWindow(event){
    for (var i = 0; i < windows.length; i++) {
        if (windows[i].number === event.detail.number) {
            windows.splice(i, 1);
            windows = windows;
            windows_store.set(windows);
        }
    }
    dock_apps.forEach(element => {
        if(element.name === event.detail.app){
            let isAppWindowOpen = false;
            for(let window of windows){
                if(window.app === event.detail.app){
                    isAppWindowOpen = true;
                }
            }
            if(!isAppWindowOpen){
                element.running = false;
                element.focused = false;
            }
        }
    });
    dock_apps = dock_apps;
    dock_apps_store.set(dock_apps);
}
