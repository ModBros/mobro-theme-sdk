import {createAction} from "@reduxjs/toolkit";
import {send} from "mobro/utils/communication";
import {THEME_LAYOUT} from "mobro/config/api";

/**
 * @function layoutRequested
 */
export const layoutRequested = createAction("layout:requested");
export const layoutFetched = createAction("layout:fetched");
export const layoutFailed = createAction("layout:failed");

export function fetchLayout() {
    return function (dispatch) {
        dispatch(layoutRequested());

        send(THEME_LAYOUT)
            .then((response) => {
                dispatch(layoutFetched(response));
            })
            .catch(() => {
                dispatch(layoutFailed());
            });
    }
}

export const layoutMode = createAction("layout:mode");
export const layoutChange = createAction("layout:change");