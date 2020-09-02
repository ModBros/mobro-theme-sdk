import {getSocket} from "mobro/utils/socket";
import {registerPublicEndpoint} from "mobro/utils/public";

// ----------------------------------------------
// communication states

export const NOT_ASKED = "not-asked";
registerPublicEndpoint("utils.communication.NOT_ASKED", NOT_ASKED);

export const FETCHING = "fetching";
registerPublicEndpoint("utils.communication.FETCHING", FETCHING);

export const SUCCESS = "success";
registerPublicEndpoint("utils.communication.SUCCESS", SUCCESS);

export const FAILED = "failed";
registerPublicEndpoint("utils.communication.FAILED", FAILED);

export function notAskedYet(state) {
    return state === NOT_ASKED;
}

export function stillFetching(state) {
    return state === FETCHING;
}

export function fetched(state) {
    return state === SUCCESS;
}

export function failed(state) {
    return state === FAILED;
}

// ----------------------------------------------
// send

export function send(url, data = {}) {
    return new Promise(resolve => {
        try {
            getSocket().emit(url, data, response => {
                resolve(response);
            });
        } catch(exception) {
            console.error("Could not send via socket");
            console.error(exception);
        }
    });
}
registerPublicEndpoint("utils.communication.send", send);