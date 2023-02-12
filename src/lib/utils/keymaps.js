export function map(keys, func) {
    keys = keys.toLowerCase().split("+");

    let ctrl = keys.includes("ctrl");
    let shift = keys.includes("shift");
    let alt = keys.includes("alt");

    let key = keys.at(keys.length - 1);

    
    document.addEventListener("keydown", (event) => {
        const condition =
            (ctrl ? event.ctrlKey : !event.ctrlKey) &&
            (shift ? event.shiftKey : !event.shiftKey) &&
            (alt ? event.altKey : !event.altKey) &&
            event.key.toLocaleLowerCase() == key;

        if (condition) {
            console.log("executing function:");
            func();
        }
    })
}
