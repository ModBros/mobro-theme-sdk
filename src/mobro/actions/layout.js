import {createAction} from "@reduxjs/toolkit";

export const layoutRequested = createAction("layout:requested");
export const layoutFetched = createAction("layout:fetched");
export const layoutFailed = createAction("layout:failed");

export function fetchLayout() {
    return function(dispatch, getState) {
        const state = getState();

        dispatch(layoutRequested());


    }
}