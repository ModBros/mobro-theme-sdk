import {createAction} from "@reduxjs/toolkit";
import {GET_SETTINGS} from "mobro/enum/endpoints";
import {send} from "mobro/utils/communication";

export const settingsRequested = createAction("settings:requested");
export const settingsFetched = createAction("settings:fetched");
export const settingsFailed = createAction("settings:failed");

export function fetchSettings() {
    return function (dispatch) {
        dispatch(settingsRequested());

        send(GET_SETTINGS)
            .then((response) => {
                dispatch(settingsFetched(response));
            })
            .catch(() => {
                dispatch(settingsFailed());
            })
    }
}