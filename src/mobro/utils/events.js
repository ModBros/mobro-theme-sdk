import {registerPublicEndpoint} from "mobro/utils/public";

export const EVENT_CHANGE_THEME = "change:theme";
registerPublicEndpoint("utils.events.CHANGE_THEME", EVENT_CHANGE_THEME);