export function appendToObjectProperty(object, property, value) {
    if (!object[property]) {
        object[property] = [];
    } else if (!Array.isArray(object[property])) {
        object[property] = [object[property]];
    }

    object[property].push(value);
}

export function addObjectPropertyByPath(object, path, value) {
    if (typeof object !== "object" || typeof path !== "string") {
        return;
    }

    path = path.split(".");
    let lastPart = path.pop();
    let current = object;

    for (let i = 0; i < path.length; i++) {
        let part = path[i];

        if (!current[part]) {
            current[part] = {};
        }

        current = current[part];
    }

    current[lastPart] = value;
}

export function getObjectPropertyByPath(object, path) {
    if (typeof object !== "object" || typeof path !== "string") {
        return;
    }

    path = path.split(".");
    let current = object;

    for (let i = 0; i < path.length; i++) {
        let part = path[i];

        if (!current[part]) {
            current[part] = {};
        }

        current = current[part];
    }

    return current;
}

export function deepValues(object, values = []) {
    if (!object || typeof object !== "object") {
        return object;
    }

    Object.values(object).forEach((value) => {
        if (value && typeof value === "object") {
            deepValues(value, values);
        } else {
            values.push(value);
        }
    });

    return values;
}