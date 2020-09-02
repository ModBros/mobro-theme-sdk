import {registerPublicEndpoint} from "mobro/utils/public";

export const EVENT_CHANGE_THEME = "theme:change";
registerPublicEndpoint("enum.events.CHANGE_THEME", EVENT_CHANGE_THEME);