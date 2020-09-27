import {createReducer, createSelector} from "@reduxjs/toolkit";
import {fetchingAction, getSelectorArgument} from "mobro/utils/redux";
import {NOT_ASKED} from "mobro/utils/communication";
import dotPropImmutable from "dot-prop-immutable";
import {sensorDataFailed, sensorDataFetched, sensorDataModified, sensorDataRequested} from "mobro/actions/sensors";
import {registerPublicEndpoint} from "mobro/utils/public";

// ----------------------------------------------
// initial state

const initialState = {
    sensorData: {},
    sensorDataFetchingState: NOT_ASKED,
    sensorDataModified: null
};

// ----------------------------------------------
// reducer

export default createReducer(initialState, {
    [sensorDataModified.type]: (state) => {
        return dotPropImmutable.set(state, "sensorDataModified", new Date().getTime());
    },

    ...fetchingAction(sensorDataRequested.type, sensorDataFetched.type, sensorDataFailed.type, "sensorDataFetchingState", (payload) => ({
        sensorData: payload
    }))
});

// ----------------------------------------------
// selectors
export const getSensorsState = state => dotPropImmutable.get(state, "sensors");
registerPublicEndpoint("reducers.sensors.getSensorState", getSensorsState);

export const getSensorData = state => dotPropImmutable.get(getSensorsState(state), "sensorData", {});
registerPublicEndpoint("reducers.sensors.getSensorData", getSensorData);

export const getSensorDataFetchingState = state => dotPropImmutable.get(getSensorsState(state), "sensorDataFetchingState");
registerPublicEndpoint("reducers.sensors.getSensorDataFetchingState", getSensorDataFetchingState);

export const getSensorDataModified = state => dotPropImmutable.get(getSensorsState(state), "sensorDataModified");
registerPublicEndpoint("reducers.sensors.getSensorDataModified", getSensorDataModified);

// sensor data selectors
export const getSensorSources = state => Object.keys(getSensorData(state));
registerPublicEndpoint("reducers.sensors.getSensorSources", getSensorSources);

export const getInformationBySource = (state, source) => dotPropImmutable.get(getSensorData(state), source);
registerPublicEndpoint("reducers.sensors.getInformationBySource", getInformationBySource);

export const getHardwareTypesBySource = (state, source) => dotPropImmutable.get(getInformationBySource(state, source), "includedhardwaretypes");
registerPublicEndpoint("reducers.sensors.getHardwareTypesBySource", getHardwareTypesBySource);

export const getSensorTypesBySourceAndHardwareType = (state, source, hardwareType) => dotPropImmutable.get(getInformationBySource(state, source), `includedsensortypes.${hardwareType.toLowerCase()}`);
registerPublicEndpoint("reducers.sensors.getSensorTypesBySourceAndHardwareType", getSensorTypesBySourceAndHardwareType);

export const getSensorDataBySource = (state, source) => {
    return dotPropImmutable.get(getInformationBySource(state, source), "data", []);
}
registerPublicEndpoint("reducers.sensors.getSensorDataBySource", getSensorDataBySource);

export const getSensorDataBySourceAndHardwareType = () => {
    return createSelector(
        [getSensorDataBySource, getSelectorArgument(1)],
        (sensorDataBySource, hardwareType) => {
            let data = [];

            sensorDataBySource.forEach((hardware) => {
                if (hardware.hardwaretype === hardwareType) {
                    data = data.concat(hardware.sensors.map((sensor) => ({
                        ...sensor,
                        hardwareid: hardware.id
                    })));
                }
            })

            return data;
        }
    );
};
registerPublicEndpoint("reducers.sensors.getSensorDataBySourceAndHardwareType", getSensorDataBySourceAndHardwareType);