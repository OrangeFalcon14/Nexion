import { windows_store } from "../store/core";

let windows;

windows_store.subscribe(value => windows = value);

export function getWindow(number) {
    for (const window of windows) {
        if(window.number == number){
            return window;
        }
    }
}

export function windowMoved(event){
    let top = event.detail.top;
    let left = event.detail.left;
    
    let window = getWindow(event.detail.number);

    window.top = top;
    window.left = left;
}

const root = document.querySelector(":root");

export function setCSSVar(variable, val) {
    // @ts-ignore
    root.style.setProperty(variable, val);
}

export function getCSSVar(variable) {
    let computedStyle = getComputedStyle(root);
    computedStyle.getPropertyValue(variable);
}
