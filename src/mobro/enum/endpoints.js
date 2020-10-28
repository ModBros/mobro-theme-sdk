import {registerPublicEndpoint} from "mobro/utils/public";

export const GET_LAYOUT = "theme:layout";
registerPublicEndpoint("enum.endpoints.GET_LAYOUT", GET_LAYOUT);

export const SAVE_LAYOUT = "theme:layout:save";
registerPublicEndpoint("enum.endpoints.SAVE_LAYOUT", SAVE_LAYOUT);

export const GET_ALL_SENSOR_DATA = "monitor:data";
registerPublicEndpoint("enum.endpoints.GET_ALL_SENSOR_DATA", GET_ALL_SENSOR_DATA);

export const UPLOAD_FILE = "theme:upload:file";
registerPublicEndpoint("enum.endpoints.UPLOAD_FILE", UPLOAD_FILE);