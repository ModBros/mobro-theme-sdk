import {createAction} from "@reduxjs/toolkit";
import {send} from "mobro/utils/communication";
import {GET_LAYOUT} from "mobro/enum/endpoints";

/**
 * @function layoutRequested
 */
export const layoutRequested = createAction("layout:requested");
export const layoutFetched = createAction("layout:fetched");
export const layoutFailed = createAction("layout:failed");

export function fetchLayout() {
    return function (dispatch) {
        dispatch(layoutRequested());

        send(GET_LAYOUT)
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
export const layoutEdit = createAction("layout:edit");