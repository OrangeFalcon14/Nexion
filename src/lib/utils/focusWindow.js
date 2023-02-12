import { windows_store, dock_apps_store } from "../store/core";

let windows, dock_apps;

windows_store.subscribe(value => windows = value)
dock_apps_store.subscribe(value => dock_apps = value)

export function focusWindow(event) {
    let number = event.detail.number;
    
    for (let window of windows){
        window.focused = false;
    }
    for(let window of windows){
        if(window.number == number){
            window.focused = true;
        }
    }
    windows = windows;
    windows_store.set(windows);

    for(let app of dock_apps){
        if(app.name == event.detail.app){
            app.focused = true;
        }else{
            app.focused = false;
        }
    }
    dock_apps = dock_apps;
    dock_apps_store.set(dock_apps);
}
