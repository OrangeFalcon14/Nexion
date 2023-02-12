import { focusWindow } from "./focusWindow";

import { applications_menu_show_store } from "../store/settings";

import { windows_store, window_ids_store, dock_apps_store } from "../store/core";

let windows, window_ids, dock_apps;

windows_store.subscribe(value => windows = value);
window_ids_store.subscribe(value => window_ids = value);
dock_apps_store.subscribe(value => dock_apps = value);

export function newWindow(app){
    applications_menu_show_store.set(false);
    
    let obj = app.detail;
    
    while(true){
        obj.number = Math.floor(Math.random() * 1000);

        if(window_ids.length == 0){
            window_ids = [...window_ids, obj.number];
            window_ids_store.set(window_ids);
            break;
        }

        if(window_ids.indexOf(obj.number) == -1){
            break;
        }
    }

    obj.top = "100px";
    obj.left = "100px";

    windows = [...windows, obj];
    windows_store.set(windows)
    focusWindow({detail: {number: obj.number, app:obj.app}});

    let appInDock = false;
    dock_apps.forEach(element => {
        if(element.name === obj.app){
            element.running = true;
            appInDock = true;
        }
    });
    if(!appInDock && obj.app !== "Welcome"){
        dock_apps.push({
            name: obj.app,
            running: true,
            focused: true,
        })
    }
    dock_apps = dock_apps;

    dock_apps_store.set(dock_apps);
}
