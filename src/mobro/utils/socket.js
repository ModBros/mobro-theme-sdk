import io from "socket.io-client";
import {EVENT_CHANGE_LAYOUT, EVENT_CHANGE_THEME} from "mobro/enum/events";
import {registerPublicEndpoint} from "mobro/utils/public";
import {DEFAULT_UUID} from "mobro/enum/channel-data";
import {dispatch} from "mobro/reducers";
import {layoutChange} from "mobro/actions/layout";
import {refreshAllChannels} from "mobro/utils/channel-data";

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
    socket = io(`${url}${window.location.search}`, {
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

    socket.on(EVENT_CHANGE_LAYOUT, (data) => {
        dispatch(layoutChange(data));
    });

    socket.on("connect", () => {
        // refresh all channel listeners on connect
        // on first connect it' empty anyways
        // on reconnect, all listeners have to be re-registered, otherwise no updates are received anymore
        refreshAllChannels();
    });
}

export function getUrl() {
    return url;
}

registerPublicEndpoint("utils.socket.getUrl", getUrl);

export function getPublicUrl(asset) {
    if (!asset) {
        return null;
    }

    return url + "/" + theme + "/".asset.replace(/^\/+/, "");
}

registerPublicEndpoint("utils.socket.getPublicUrl", getPublicUrl);

export function getPublicUploadUrl(asset) {
    if (!asset) {
        return null;
    }

    return url + "/" + asset.replace(/^\/+/, "");
}

registerPublicEndpoint("utils.socket.getPublicUploadUrl", getPublicUploadUrl);

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

registerPublicEndpoint("utils.socket.getDeviceUuid", getDeviceUuid);

export function getDeviceResolution() {
    if (originalParams && originalParams.get("resolution")) {
        const [width, height] = originalParams.get("resolution").split("x");

        return {width, height};
    }

    return null;
}

registerPublicEndpoint("utils.socket.getDeviceResolution", getDeviceResolution);

export function hasEditmodeParam() {
    return originalParams ? !!originalParams.get("editmode") : false;
}

registerPublicEndpoint("utils.socket.getDeviceUuid", getDeviceUuid);