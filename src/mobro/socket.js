import io from "socket.io-client";

export default class Socket {
    url = null;
    socket = null;
    isConnected = false;
    originalSearchParams = null;

    constructor() {
        this.originalSearchParams = window.location.search;

        this.url = `${window.location.protocol}//${window.location.hostname}:42100`;
        this.socket = io(`${window.location.protocol}//${window.location.hostname}:42100${window.location.search}`, {
            transports: ["websocket"]
        });

        this.on("change:theme", (data) => {
            console.info("Switching theme to", data.theme);

            fetch(`${this.url}/theme/?theme=${data.theme}`)
                .then(() => {
                    console.info("Reloading due to theme switch ...");
                    window.location = `/${this.originalSearchParams}`;
                })
                .catch((error) => {
                    console.error("Could not switch themes", error);
                });
        });

        this.on("connect", () => {
            this.isConnected = true;
        });

        this.on("disconnect", () => {
            this.isConnected = false;
        })
    }

    on(...args) {
        this.socket.on(...args);
    }

    off(...args) {
        this.socket.off(...args);
    }
}