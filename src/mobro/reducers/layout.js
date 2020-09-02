import {createReducer} from "@reduxjs/toolkit";
import {fetchingAction} from "mobro/utils/redux";
import {layoutChange, layoutFailed, layoutFetched, layoutMode, layoutRequested} from "mobro/actions/layout";
import {NOT_ASKED} from "mobro/utils/communication";
import {saveLayout} from "mobro/utils/layout";
import dotPropImmutable from "dot-prop-immutable";
import {LAYOUT_MODE_EDIT} from "mobro/enum/layout";

// ----------------------------------------------
// initial state

const initialState = {
    layoutFetchingState: NOT_ASKED,
    layoutMode: LAYOUT_MODE_EDIT,
    layout: {
        width: null,
        height: null,
        components: []
    }
};

// ----------------------------------------------
// reducer

export default createReducer(initialState, {
    [layoutMode.type]: (state, {payload}) => dotPropImmutable.set(state, "layoutMode", payload),

    [layoutChange.type]: (state, {payload}) => {
        if (!Array.isArray(payload)) {
            return state;
        }

        payload.forEach((item, i) => {
            state = dotPropImmutable.merge(state, `layout.components.${i}`, item);
        });

        saveLayout(dotPropImmutable.get(state, "layout"));

        return state;
    },

    ...fetchingAction(layoutRequested.type, layoutFetched.type, layoutFailed.type, "layoutFetchingState", payload => ({
        layout: payload
    }))
});

// ----------------------------------------------
// selectors

export const getLayoutState = state => dotPropImmutable.get(state, "layout");
export const getLayoutFetchingState = state => dotPropImmutable.get(getLayoutState(state), "layoutFetchingState");
export const getLayout = state => dotPropImmutable.get(getLayoutState(state), "layout");
export const getLayoutMode = state => dotPropImmutable.get(getLayoutState(state), "layoutMode");
export const getLayoutConfig = state => dotPropImmutable.get(getLayout(state), "config");
export const getLayoutComponents = state => dotPropImmutable.get(getLayout(state), "components");