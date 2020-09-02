import {send} from "mobro/utils/communication";
import {LAYOUT_MODE_DISPLAY, LAYOUT_MODE_EDIT} from "mobro/enum/layout";
import {SAVE_LAYOUT} from "mobro/enum/endpoints";

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

/**
 * @param {[]} layout
 * @returns {[]}
 */
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

/**
 * @param {{}} config
 * @returns {{}}
 */
export function extractGridConfig(config) {
    return {
        x: config.x || 0,
        y: config.y || 0,
        w: config.w || 12,
        h: config.h || 5
    }
}

/**
 * @param {{}} layout
 */
export function saveLayout(layout) {
    if (!layout) {
        return;
    }

    send(SAVE_LAYOUT, layout);
}