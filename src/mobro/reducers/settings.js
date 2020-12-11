import {createReducer} from "@reduxjs/toolkit";
import {fetchingAction} from "mobro/utils/redux";
import {settingsFailed, settingsFetched, settingsRequested} from "mobro/actions/settings";
import {NOT_ASKED} from "mobro/utils/communication";
import {registerPublicEndpoint} from "mobro/utils/public";

// ----------------------------------------------
// initial state

const initialState = {
    settingsFetchingState: NOT_ASKED,
    settings: {}
};

// ----------------------------------------------
// reducer

export default createReducer(initialState, {
    ...fetchingAction(settingsRequested.type, settingsFetched.type, settingsFailed.type, "settingsFetchingState", (payload) => ({
        settings: payload
    }))
});

// ----------------------------------------------
// selectors

export const getSettingsState = state => state.settings;
registerPublicEndpoint("reducers.settings.getSettingsState", getSettingsState);

export const getSettings = state => getSettingsState(state)?.settings;
registerPublicEndpoint("reducers.settings.getSettings", getSettings);

export const getSettingsFetchingState = state => getSettingsState(state)?.settingsFetchingState;
registerPublicEndpoint("reducers.settings.getSettingsFetchingState", getSettingsFetchingState);
