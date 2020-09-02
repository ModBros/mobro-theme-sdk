import dotPropImmutable from "dot-prop-immutable";
import {UNIT_PERCENTAGE} from "mobro/enum/channel-data";

export function extractLabel(data) {
    return dotPropImmutable.get(data, "label");
}

export function extractRawValue(data) {
    return dotPropImmutable.get(data, "value");
}

export function extractRawUnit(data) {
    return dotPropImmutable.get(data, "unit")
}

export function extractValue(data, fixate = true) {
    let value = extractRawValue(data);

    if (typeof value !== "number" || !fixate) {
        return value;
    }

    let fixed = 0;

    // todo temp
    if (isPercentageData(data)) {
        fixed = 1;
    }

    return value.toFixed(fixed);
}

export function isPercentageData(data) {
    return extractRawUnit(data) === UNIT_PERCENTAGE;
}