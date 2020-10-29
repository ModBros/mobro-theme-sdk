import {registerPublicEndpoint} from "mobro/utils/public";

export const DEFAULT_UUID = "default";
registerPublicEndpoint("enum.channelData.DEFAULT_UUID", DEFAULT_UUID);

export const CHANNEL_PREFIX = "monitor:data:";
registerPublicEndpoint("enum.channelData.CHANNEL_PREFIX", CHANNEL_PREFIX);

export const UNIT_PERCENTAGE = "%";
registerPublicEndpoint("enum.channelData.UNIT_PERCENTAGE");