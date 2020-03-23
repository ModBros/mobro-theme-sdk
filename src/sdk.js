import Socket from "mobro/socket";
import generalChannels from "mobro/enum/channels";
import commands from "mobro/enum/commands";
import com from "mobro/enum/com";

const SDK = {
    generalChannels: generalChannels,
    commands: commands,
    com: com,
    socket: null,

    init() {
        this.socket = new Socket();
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