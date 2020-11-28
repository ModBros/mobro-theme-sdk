import io from "socket.io-client";
import {EVENT_CHANGE_THEME} from "mobro/enum/events";
import {registerPublicEndpoint} from "mobro/utils/public";
import {DEFAULT_UUID} from "mobro/enum/channel-data";

let originalSearchParams = null;
let originalParams = null;
let url = null;
let socket = null;
let theme = "default";

export function getSocket() {
    if (!socket) {
        init();
    }

    return socket;
}

registerPublicEndpoint("utils.socket.getSocket", getSocket);

export function setCurrentTheme(currentTheme) {
    theme = currentTheme;
}

registerPublicEndpoint("utils.socket.setCurrentTheme", setCurrentTheme);

function init() {
    originalSearchParams = window.location.search;
    originalParams = new URLSearchParams(originalSearchParams);

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

export function getUrl() {
    return url;
}

export function getPublicUrl(asset) {
    if (!asset) {
        return null;
    }

    return url + "/" + theme + "/".asset.replace(/^\/+/, "");
}

export function getPublicUploadUrl(asset) {
    if (!asset) {
        return null;
    }

    return url + "/" + asset.replace(/^\/+/, "");
}

export function getDeviceName() {
    return originalParams ? originalParams.get("name") : "Local Device";
}

registerPublicEndpoint("utils.socket.getDeviceName", getDeviceName);

export function getDeviceUuid() {
    if (originalParams && originalParams.get("uuid")) {
        return originalParams.get("uuid");
    }

    return DEFAULT_UUID;
}

export function hasEditmodeParam() {
    return originalParams ? !!originalParams.get("editmode") : false;
}

registerPublicEndpoint("utils.socket.getDeviceUuid", getDeviceUuid);