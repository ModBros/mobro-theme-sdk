import {createReducer} from "@reduxjs/toolkit";
import {fetchingAction} from "mobro/utils/redux";
import {layoutChange, layoutFailed, layoutFetched, layoutMode, layoutRequested} from "mobro/actions/layout";
import {NOT_ASKED} from "mobro/utils/communication";
import {LAYOUT_MODE_EDIT} from "mobro/utils/layout";

// ----------------------------------------------
// state reducers

const initialState = {
    layoutFetchingState: NOT_ASKED,
    layoutMode: LAYOUT_MODE_EDIT,
    layout: {
        width: null,
        height: null,
        components: []
    }
};

export default createReducer(initialState, {
    [layoutMode.type]: (state, {payload}) => ({
        ...state,
        layoutMode: payload
    }),

    [layoutChange.type]: (state, {payload}) => {
        for (let i = 0; i < state.layout.components.length; i++) {
            if (!state.layout.components[i] || !state.layout.components[i].config || !payload[i]) {
                continue;
            }

            state.layout.components[i].config = {
                ...state.layout.components[i].config,
                ...payload[i]
            }
        }
    },

    ...fetchingAction(layoutRequested.type, layoutFetched.type, layoutFailed.type, "layoutFetchingState", payload => ({
        layout: payload
    }))
});

// ----------------------------------------------
// state selectors

export const getLayoutState = state => state.layout;
export const getLayoutFetchingState = state => getLayoutState(state).layoutFetchingState;
export const getLayout = state => getLayoutState(state).layout;
export const getLayoutMode = state => getLayoutState(state).layoutMode;
export const getLayoutComponents = state => getLayout(state).components;