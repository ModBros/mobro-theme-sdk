import {createReducer} from "@reduxjs/toolkit";
import {fetchingAction} from "mobro/utils/redux";
import {layoutFailed, layoutFetched, layoutRequested} from "mobro/actions/layout";

const initialState = {
    foo: "bar"
};

export default createReducer(initialState, {
    ...fetchingAction(layoutRequested.type, layoutFetched.type, layoutFailed.type, "layoutFetchingState", payload => ({
        layout: payload
    }))
});