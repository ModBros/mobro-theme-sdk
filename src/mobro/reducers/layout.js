import {createReducer} from "@reduxjs/toolkit";
import {fetchingAction} from "mobro/utils/redux";
import {layoutFailed, layoutFetched, layoutRequested} from "mobro/actions/layout";
import {NOT_ASKED} from "mobro/utils/communication";

// ----------------------------------------------
// state reducers

const initialState = {
    layoutFetchingState: NOT_ASKED,
    layout: {
        components: []
    }
};

export default createReducer(initialState, {
    ...fetchingAction(layoutRequested.type, layoutFetched.type, layoutFailed.type, "layoutFetchingState", payload => ({
        layout: payload
    }))
});

// ----------------------------------------------
// state selectors

export const getLayoutState = state => state.layout;
export const getLayoutFetchingState = state => getLayoutState(state).layoutFetchingState;
export const getLayout = state => getLayoutState(state).layout;