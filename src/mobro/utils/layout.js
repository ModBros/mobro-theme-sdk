import debounce from "debounce";
import {send} from "mobro/utils/communication";
import {LAYOUT_MODE_DISPLAY, LAYOUT_MODE_EDIT} from "mobro/enum/layout";
import {SAVE_LAYOUT} from "mobro/enum/endpoints";
import {getDataOrDefault} from "mobro/utils/component";

export const defaultLayoutConfig = {
    config: {
        width: 480,
        height: 320,
        rowHeight: 10
    },
    components: []
}

export const defaultLayoutEditConfig = {
    rowHeight: {
        type: "numeric"
    },
    background: {
        type: "single-image"
    }
}

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
        x: getDataOrDefault(config.x, 0),
        y: getDataOrDefault(config.y, Infinity),
        w: getDataOrDefault(config.w, 4),
        h: getDataOrDefault(config.h, 5)
    }
}

/**
 * @param {{}} layout
 */
export const saveLayout = debounce((layout) => {
    if (!layout) {
        return;
    }

    send(SAVE_LAYOUT, layout);
}, 300);