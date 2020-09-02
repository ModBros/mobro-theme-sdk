import {registerPublicEndpoint} from "mobro/utils/public";

export const LAYOUT_MODE_DISPLAY = "display";
registerPublicEndpoint("enum.layout.LAYOUT_MODE_DISPLAY", LAYOUT_MODE_DISPLAY);

export const LAYOUT_MODE_EDIT = "edit";
registerPublicEndpoint("enum.layout.LAYOUT_MODE_EDIT", LAYOUT_MODE_EDIT);