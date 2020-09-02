import {registerPublicEndpoint} from "mobro/utils/public";

export const CHANNEL_PREFIX = "monitor:data:";
registerPublicEndpoint("enum.channel-data.CHANNEL_PREFIX", CHANNEL_PREFIX);

export const UNIT_PERCENTAGE = "%";
registerPublicEndpoint("enum.channel-data.UNIT_PERCENTAGE");