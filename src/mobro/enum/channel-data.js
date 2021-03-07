import {registerPublicEndpoint} from "mobro/utils/public";

export const DEFAULT_UUID = "default";
registerPublicEndpoint("enum.channelData.DEFAULT_UUID", DEFAULT_UUID);

export const CHANNEL_PREFIX = "monitor:data:";
registerPublicEndpoint("enum.channelData.CHANNEL_PREFIX", CHANNEL_PREFIX);

export const UNIT_PERCENTAGE = "%";
registerPublicEndpoint("enum.channelData.UNIT_PERCENTAGE", UNIT_PERCENTAGE);

export const UNIT_VOLTAGE = "V";
registerPublicEndpoint("enum.channelData.UNIT_VOLTAGE", UNIT_VOLTAGE);

export const SENSOR_TYPE_TEMPERATURE = "Temperature";
registerPublicEndpoint("enum.channelData.SENSOR_TYPE_TEMPERATURE", SENSOR_TYPE_TEMPERATURE);