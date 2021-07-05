import {registerPublicEndpoint} from "mobro/utils/public";

export const GET_LAYOUT = "theme:layout";
registerPublicEndpoint("enum.endpoints.GET_LAYOUT", GET_LAYOUT);

export const GET_LAYOUT_NAMES = "theme:layout:names";
registerPublicEndpoint("enum.endpoints.GET_LAYOUT_NAMES", GET_LAYOUT_NAMES);

export const CHANGE_LAYOUT = "theme:layout:change";
registerPublicEndpoint("enum.endpoints.CHANGE_LAYOUT", CHANGE_LAYOUT);

export const DELETE_LAYOUT = "theme:layout:delete";
registerPublicEndpoint("enum.endpoints.DELETE_LAYOUT", DELETE_LAYOUT);

export const SAVE_LAYOUT = "theme:layout:save";
registerPublicEndpoint("enum.endpoints.SAVE_LAYOUT", SAVE_LAYOUT);

export const GET_ALL_SENSOR_DATA = "monitor:data";
registerPublicEndpoint("enum.endpoints.GET_ALL_SENSOR_DATA", GET_ALL_SENSOR_DATA);

export const UPLOAD_FILE = "theme:upload:file";
registerPublicEndpoint("enum.endpoints.UPLOAD_FILE", UPLOAD_FILE);

export const ADD_CHANNEL = "theme:channel:add";
registerPublicEndpoint("enum.endpoints.ADD_CHANNEL", ADD_CHANNEL);

export const REMOVE_CHANNEL = "theme:channel:remove";
registerPublicEndpoint("enum.endpoints.REMOVE_CHANNEL", REMOVE_CHANNEL);

export const GET_SETTINGS = "settings";
registerPublicEndpoint("enum.endpoints.GET_SETTINGS", GET_SETTINGS);

export const GET_FONT_LIST = "theme:font:list";
registerPublicEndpoint("enum.endpoints.GET_FONT_LIST", GET_FONT_LIST);

export const UPDATE_RESOLUTION = "theme:layout:update-resolution";
registerPublicEndpoint("enum.endpoints.UPDATE_RESOLUTION", UPDATE_RESOLUTION);

export const GET_RESOLUTION = "theme:layout:get-resolution";
registerPublicEndpoint("enum.endpoints.GET_RESOLUTION", GET_RESOLUTION);
