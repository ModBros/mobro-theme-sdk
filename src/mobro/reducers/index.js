import {combineReducers, configureStore} from "@reduxjs/toolkit";
import layout from "mobro/reducers/layout";

export const store = configureStore({
    reducer: combineReducers({
        layout: layout
    })
});