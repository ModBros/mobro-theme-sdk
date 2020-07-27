import {getSocket} from "mobro/utils/socket";

export const NOT_ASKED = "not-asked";
export const FETCHING = "fetching";
export const SUCCESS = "success";
export const FAILED = "failed";

export function send(url, data = {}) {
    return new Promise(resolve => {
        getSocket().emit(url, data, response => {
            resolve(response);
        });
    });
}