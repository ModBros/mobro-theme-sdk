import {registerPublicEndpoint} from "mobro/utils/public";

export const EVENT_CHANGE_THEME = "change:theme";
registerPublicEndpoint("enum.events.EVENT_CHANGE_THEME", EVENT_CHANGE_THEME);

export const EVENT_CHANGE_LAYOUT = "change:layout";
registerPublicEndpoint("enum.events.EVENT_CHANGE_LAYOUT", EVENT_CHANGE_LAYOUT);