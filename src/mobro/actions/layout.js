import {createAction} from "@reduxjs/toolkit";
import {send} from "mobro/utils/communication";
import {CHANGE_LAYOUT, GET_LAYOUT, GET_LAYOUT_NAMES} from "mobro/enum/endpoints";
import {defaultLayoutConfig} from "mobro/utils/layout";
import {empty} from "mobro/utils/helper";
import {DEFAULT_LAYOUT_NAME} from "mobro/enum/layout";

export const layoutRequested = createAction("layout:requested");
export const layoutFetched = createAction("layout:fetched");
export const layoutFailed = createAction("layout:failed");

export function fetchLayout() {
    return function (dispatch) {
        dispatch(layoutRequested());

        send(GET_LAYOUT)
            .then((response) => {
                const layoutName = response?.name || DEFAULT_LAYOUT_NAME;
                const layout = response?.config || {};

                dispatch(layoutFetched({layoutName, layout}));
            })
            .catch(() => {
                dispatch(layoutFailed());
            });
    }
}

export const layoutNamesRequested = createAction("layout:names:requested");
export const layoutNamesFetched = createAction("layout:names:fetched");
export const layoutNamesFailed = createAction("layout:names:failed");

export function fetchLayoutNames() {
    return function (dispatch) {
        dispatch(layoutNamesRequested());

        send(GET_LAYOUT_NAMES)
            .then((response) => {
                dispatch(layoutNamesFetched(response));
            })
            .catch(() => {
                dispatch(layoutNamesFailed())
            });
    }
}

export function changeToLayoutName(name) {
    return function (dispatch) {
        dispatch(layoutNameChange(name));

        send(CHANGE_LAYOUT, name)
            .then((response) => {
                layoutChange(response);
            })
            .catch(() => {
            })
    }
}

export const selectComponent = createAction("layout:component:select");

export const layoutMode = createAction("layout:mode");
export const layoutUpdate = createAction("layout:update");
export const layoutNameChange = createAction("layout:name:change");
export const layoutChange = createAction("layout:change");

export const layoutEdit = createAction("layout:edit");
export const addComponent = createAction("layout:component:add");
export const removeComponent = createAction("layout:component:remove");
export const copyComponent = createAction("layout:component:copy");
export const pasteComponent = createAction("layout:component:paste");
export const moveComponent = createAction("layout:component:move");

export const updateEditmode = createAction("layout:editmode:update");