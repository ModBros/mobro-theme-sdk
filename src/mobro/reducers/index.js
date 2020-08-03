import {combineReducers, configureStore, createReducer} from "@reduxjs/toolkit";
import layout from "mobro/reducers/layout";
import {withReducersHook} from "mobro/hooks/redux/reducers-hook";

let store = null;

export function createStore() {
    if (!store) {
        const reducers = withReducersHook()(createReducer, combineReducers, {
            layout: layout
        });

        store = configureStore({
            reducer: reducers
        });
    }

    return store;
}