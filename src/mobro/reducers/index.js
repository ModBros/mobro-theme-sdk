import {combineReducers, configureStore, createReducer} from "@reduxjs/toolkit";
import {withReducersHook} from "mobro/hooks/redux/reducers-hook";
import layout from "mobro/reducers/layout";
import sidebar from "mobro/reducers/sidebar";
import sensors from "mobro/reducers/sensors";
import settings from "mobro/reducers/settings";
import font from "mobro/reducers/font";
import {registerPublicEndpoint} from "mobro/utils/public";

let store = null;

export function createStore() {
    if (!store) {
        const reducers = withReducersHook()(createReducer, combineReducers, {
            layout: layout,
            sidebar: sidebar,
            sensors: sensors,
            settings: settings,
            font: font
        });

        store = configureStore({
            reducer: reducers
        });
    }

    return store;
}

/**
 * @returns {{}}
 */
export function getStore() {
    if (!store) {
        createStore();
    }

    return store;
}

/**
 * @returns {*}
 */
export function getState() {
    return getStore().getState();
}

registerPublicEndpoint("reducers.getState", getState);

/**
 * @param args
 * @returns {*}
 */
export function dispatch(...args) {
    return getStore().dispatch(...args);
}

registerPublicEndpoint("reducers.dispatch", dispatch);
