import {addObjectPropertyByPath} from "mobro/utils/object";

const sdk = {};

export function registerPublicEndpoint(path, endpoint) {
    addObjectPropertyByPath(sdk, path, endpoint);
}

export function provide() {
    return sdk;
}