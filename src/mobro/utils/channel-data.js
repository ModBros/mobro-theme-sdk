import {UNIT_PERCENTAGE} from "mobro/enum/channel-data";
import {ADD_CHANNEL, REMOVE_CHANNEL} from "mobro/enum/endpoints";
import {send} from "mobro/utils/communication";
import {registerPublicEndpoint} from "mobro/utils/public";

const _channelListeners = {};

export function addChannel({id}) {
    if (!id) {
        return false;
    }

    // increment channel listener count
    _channelListeners[id] = _channelListeners[id] ? _channelListeners[id] + 1 : 1;
    send(ADD_CHANNEL, {id});

    return true;
}

registerPublicEndpoint("utils.channelData.addChannel", addChannel);

export function removeChannel({id}) {
    if (!id) {
        return false;
    }

    // decrement channel listener count
    _channelListeners[id] = _channelListeners[id] ? _channelListeners[id] - 1 : 0;

    // if no one is listening anymore, remove the channel
    if (!_channelListeners[id]) {
        send(REMOVE_CHANNEL, {id});
    }

    return true;
}

registerPublicEndpoint("utils.channelData.removeChannel", removeChannel);

export function extractLabel(data) {
    return data?.label;
}

registerPublicEndpoint("utils.channelData.extractLabel", extractLabel);

export function extractRawValue(data) {
    return data?.value;
}

registerPublicEndpoint("utils.channelData.extractRawValue", extractRawValue);

export function extractRawUnit(data) {
    return data?.unit;
}

registerPublicEndpoint("utils.channelData.extractRawUnit", extractRawUnit);

export function extractValue(data, fixate = true, extractor = extractRawValue) {
    let value = extractor(data);

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

registerPublicEndpoint("utils.channelData.extractValue", extractValue);

export function extractRawMinValue(data) {
    return data?.min;
}

registerPublicEndpoint("utils.channelData.extractRawMinValue", extractRawMinValue);

export function extractRawMaxValue(data) {
    return data?.max;
}

registerPublicEndpoint("utils.channelData.extractRawMaxValue", extractRawMaxValue);

export function isPercentageData(data) {
    return extractRawUnit(data) === UNIT_PERCENTAGE;
}

registerPublicEndpoint("utils.channelData.isPercentageData", isPercentageData);