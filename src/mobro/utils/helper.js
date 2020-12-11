import {registerPublicEndpoint} from "mobro/utils/public";

export function noop() {
}

registerPublicEndpoint("utils.helper.noop", noop);

export function empty(value) {
    if (!value) {
        return true;
    }

    if (Array.isArray(value)) {
        return value.length === 0;
    }

    if (typeof value === "object") {
        return Object.keys(value).length === 0;
    }

    return false;
}

registerPublicEndpoint("utils.helper.empty", empty);

export function map(value, callback) {
    if (!value) {
        return [];
    }

    if (Array.isArray(value)) {
        return value.map(callback);
    }

    if (typeof value === "object") {
        return Object.entries(value).map(([key, value]) => {
            return callback(value, key);
        });
    }

    return [value];
}

registerPublicEndpoint("utils.helper.map", map);

export function first(value) {
    if (Array.isArray(value)) {
        return value[0];
    }

    return value;
}

registerPublicEndpoint("utils.helper.first", first);

export function last(value) {
    if (Array.isArray(value)) {
        return value[value.length - 1];
    }

    return value;
}

registerPublicEndpoint("utils.helper.last", last);