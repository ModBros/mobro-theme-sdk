import io from "socket.io-client";
import {EVENT_CHANGE_THEME} from "mobro/enum/events";

let originalSearchParams = null;
let url = null;
let socket = null;

export function getSocket() {
    if (!socket) {
        init();
    }

    return socket;
}

function init() {
    originalSearchParams = window.location.search;
    url = `${window.location.protocol}//${window.location.hostname}:42100`;
    socket = io(`${window.location.protocol}//${window.location.hostname}:42100${window.location.search}`, {
        transports: ["websocket"]
    });

    socket.on(EVENT_CHANGE_THEME, (data) => {
        console.info("Switching theme to", data.theme);

        fetch(`${url}/theme/?theme=${data.theme}`)
            .then(() => {
                console.info("Reloading due to theme switch ...");
                window.location = `/${originalSearchParams}`;
            })
            .catch((error) => {
                console.error("Could not switch themes", error);
            });
    });
}