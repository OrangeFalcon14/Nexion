import { readable, writable } from "svelte/store";
import { createAvatar } from "@dicebear/core";
import { pixelArt } from "@dicebear/collection";
import { uniqueNamesGenerator, adjectives, names } from 'unique-names-generator';

export const locked_store = writable(false);
export const applications_menu_show_store = writable(false);
export const wallpaper_paths_store = writable([
    "/Nexion/wallpapers/ash-edmonds-0aWZdK8nK2I-unsplash.jpg",
    "/Nexion/wallpapers/hao-wang-pVq6YhmDPtk-unsplash.jpg",
    "/Nexion/wallpapers/jr-korpa-9XngoIpxcEo-unsplash.jpg",
    "/Nexion/wallpapers/pawel-czerwinski-tMbQpdguDVQ-unsplash.jpg",
    "/Nexion/wallpapers/richard-horvath-_nWaeTF6qo0-unsplash.jpg",
    "/Nexion/wallpapers/shapelined-_JBKdviweXI-unsplash.jpg",
    "/Nexion/wallpapers/wladislaw-sokolowskij-0vw4InAC-yM-unsplash.jpg",
]);


// set username

const username = uniqueNamesGenerator({
    dictionaries: [adjectives, names],
    length: 2,
    separator: " ",
    style: "lowerCase"
});

export const username_store = readable(username);

// set user avatar
const date = new Date();

const avatar = createAvatar(pixelArt, {
    seed: username
})

let jpeg = await avatar.jpeg().toDataUri();

export const user_avatar = readable(jpeg);

export const password_store = writable("");
