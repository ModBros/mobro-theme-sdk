import Socket from "mobro/socket";
import generalChannels from "mobro/enum/channels";
import commands from "mobro/enum/commands";
import com from "mobro/enum/com";

const socket = new Socket();

const SDK = {
    generalChannels: generalChannels,
    commands: commands,
    com: com,

    getSocket() {
        return socket;
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