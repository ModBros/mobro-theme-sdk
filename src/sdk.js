import Socket from "mobro/socket";
import generalChannels from "mobro/enum/channels";
import commands from "mobro/enum/commands";
import com from "mobro/enum/com";
import Helper from "mobro/helper";

const SDK = {
    generalChannels: generalChannels,
    commands: commands,
    com: com,
    socket: null,
    initialized: false,
    helper: null,

    init() {
        return new Promise((resolve) => {
            this.socket = new Socket();

            const handler = async () => {
                // sanity check
                if (this.initialized) {
                    return;
                }

                this.initialized = true;
                this.socket.off("connect", handler);

                const settings = await this.emit("settings");

                this.helper = new Helper(settings);

                resolve();
            };

            this.socket.on("connect", handler);
        });
    },

    getSocket() {
        return this.socket;
    },

    isConnected() {
        return this.getSocket().isConnected;
    },

    addChannelListener(channel, listener) {
        this.getSocket().on(`monitor:data:${channel}`, listener);
    },

    removeChannelListener(channel, listener) {
        this.getSocket().off(`monitor:data:${channel}`, listener);
    },

    emit(event, data) {
        data = data || {};

        return new Promise((resolve => {
            this.getSocket().socket.emit(event, data, (response) => {
                resolve(response);
            });
        }));
    }
};

window.MobroSDK = SDK;