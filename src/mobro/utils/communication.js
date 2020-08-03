import {getSocket} from "mobro/utils/socket";

export const NOT_ASKED = "not-asked";
export const FETCHING = "fetching";
export const SUCCESS = "success";
export const FAILED = "failed";

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