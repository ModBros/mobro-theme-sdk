import {createAction} from "@reduxjs/toolkit";
import {send} from "mobro/utils/communication";
import {GET_ALL_SENSOR_DATA} from "mobro/enum/endpoints";
import {getSensorDataModified} from "mobro/reducers/sensors";

export const sensorDataRequested = createAction("sensor:data:requested");
export const sensorDataFetched = createAction("sensor:data:fetched");
export const sensorDataFailed = createAction("sensor:data:failed");
export const sensorDataModified = createAction("sensor:data:modified");

export function fetchSensorData() {
    return function (dispatch, getState) {
        const state = getState();
        const modified = getSensorDataModified(state);
        const now = new Date();

        // re-fetch only every minute
        if (!modified || (now.getTime() - modified >= 60 * 60 * 1000)) {
            dispatch(sensorDataModified());
            dispatch(sensorDataRequested());

            send(GET_ALL_SENSOR_DATA)
                .then((response) => {
                    dispatch(sensorDataFetched(response));
                })
                .catch(() => {
                    dispatch(sensorDataFailed());
                });
        }
    }
}