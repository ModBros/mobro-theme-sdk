import {createAction} from "@reduxjs/toolkit";
import {send} from "mobro/utils/communication";
import {CHANGE_LAYOUT, DELETE_LAYOUT, GET_LAYOUT, GET_LAYOUT_NAMES} from "mobro/enum/endpoints";
import {noop} from "mobro/utils/helper";
import {DEFAULT_LAYOUT_NAME} from "mobro/enum/layout";

export const layoutRequested = createAction("layout:requested");
export const layoutFetched = createAction("layout:fetched");
export const layoutFailed = createAction("layout:failed");

export function fetchLayout() {
    return function (dispatch) {
        dispatch(layoutRequested());

        send(GET_LAYOUT)
            .then((response) => {
                const layoutName = response?.layoutName || DEFAULT_LAYOUT_NAME;
                const layout = response?.layout || {};

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
                dispatch(layoutNamesFetched(response.layoutNames));
            })
            .catch(() => {
                dispatch(layoutNamesFailed())
            });
    }
}

export function changeToLayoutName(layoutName, layout = null) {
    return function (dispatch) {
        dispatch(layoutNameChange(layoutName));

        send(CHANGE_LAYOUT, {layoutName, layout})
            .then((response) => {
                dispatch(layoutChange(response));
            })
            .catch(noop)
    }
}

export function deleteLayout(layoutName) {
    return function (dispatch) {
        send(DELETE_LAYOUT, layoutName)
            .then((response) => {
                dispatch(layoutDelete(layoutName));
                dispatch(layoutChange(response));
                dispatch(fetchLayoutNames());
            })
            .catch(noop);
    }
}

export const selectComponent = createAction("layout:component:select");

export const layoutMode = createAction("layout:mode");
export const layoutUpdate = createAction("layout:update");
export const layoutNameChange = createAction("layout:name:change");
export const layoutChange = createAction("layout:change");
export const layoutDelete = createAction("layout:delete");

export const layoutEdit = createAction("layout:edit");
export const addComponent = createAction("layout:component:add");
export const removeComponent = createAction("layout:component:remove");
export const copyComponent = createAction("layout:component:copy");
export const pasteComponent = createAction("layout:component:paste");
export const duplicateComponent = createAction("layout:component:duplicate");
export const moveComponent = createAction("layout:component:move");

export const updateEditmode = createAction("layout:editmode:update");