import {registerPublicEndpoint} from "mobro/utils/public";
import {getLayout} from "mobro/reducers/layout";
import {getState} from "mobro/reducers";
import {send} from "mobro/utils/communication";

export const LAYOUT_MODE_DISPLAY = "display";
registerPublicEndpoint("utils.layout.LAYOUT_MODE_DISPLAY", LAYOUT_MODE_DISPLAY);

export const LAYOUT_MODE_EDIT = "edit";
registerPublicEndpoint("utils.layout.LAYOUT_MODE_EDIT", LAYOUT_MODE_EDIT);

/**
 * @param {string} mode
 * @returns {boolean}
 */
export function isDisplayMode(mode) {
    return mode === LAYOUT_MODE_DISPLAY;
}

/**
 * @param {string} mode
 * @returns {boolean}
 */
export function isEditMode(mode) {
    return mode === LAYOUT_MODE_EDIT;
}

export function extractLayoutFromGrid(layout) {
    if (!Array.isArray(layout)) {
        return []
    }

    return layout.map((item) => ({
        x: item.x,
        y: item.y,
        w: item.w,
        h: item.h
    }));
}

export function saveLayout() {
    const layout = getLayout(getState());

    send()
}