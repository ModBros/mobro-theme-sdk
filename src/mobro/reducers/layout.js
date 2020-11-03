import {createReducer} from "@reduxjs/toolkit";
import {fetchingAction} from "mobro/utils/redux";
import {
    addComponent,
    layoutChange,
    layoutEdit,
    layoutFailed,
    layoutFetched,
    layoutMode,
    layoutRequested,
    removeComponent
} from "mobro/actions/layout";
import {NOT_ASKED} from "mobro/utils/communication";
import {defaultLayoutConfig, saveLayout} from "mobro/utils/layout";
import dotPropImmutable from "dot-prop-immutable";
import {LAYOUT_MODE_EDIT} from "mobro/enum/layout";
import {registerPublicEndpoint} from "mobro/utils/public";
import {getDataComponentDefaultValue} from "mobro/hooks/components-hooks";

// ----------------------------------------------
// initial state

const initialState = {
    layoutFetchingState: NOT_ASKED,
    layoutMode: LAYOUT_MODE_EDIT,
    layout: defaultLayoutConfig
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
            state = dotPropImmutable.merge(state, `layout.components.${i}.config`, item);
        });

        saveLayout(dotPropImmutable.get(state, "layout"));

        return state;
    },

    ...fetchingAction(layoutRequested.type, layoutFetched.type, layoutFailed.type, "layoutFetchingState", payload => ({
        layout: payload
    })),

    [layoutEdit.type]: (state, {payload}) => {
        const {path, name, data} = payload;

        state = dotPropImmutable.set(state, `layout${path}.config.${name}`, data);
        saveLayout(dotPropImmutable.get(state, "layout"));

        return state;
    },

    [addComponent.type]: (state, {payload}) => {
        return dotPropImmutable.merge(state, "layout.components", {
            type: payload,
            config: getDataComponentDefaultValue(payload)
        });
    },

    [removeComponent.type]: (state, {payload}) => {
        const {path} = payload;

        return dotPropImmutable.delete(state, `layout${path}`);
    }
});

// ----------------------------------------------
// selectors

export const getLayoutState = state => dotPropImmutable.get(state, "layout");
registerPublicEndpoint("reducers.layout.getLayoutState", getLayoutState);

export const getLayoutFetchingState = state => dotPropImmutable.get(getLayoutState(state), "layoutFetchingState");
registerPublicEndpoint("reducers.layout.getLayoutFetchingState", getLayoutFetchingState);

export const getLayout = state => dotPropImmutable.get(getLayoutState(state), "layout");
registerPublicEndpoint("reducers.layout.getLayout", getLayout);

export const getLayoutMode = state => dotPropImmutable.get(getLayoutState(state), "layoutMode");
registerPublicEndpoint("reducers.layout.getLayoutMode", getLayoutMode);

export const getLayoutConfig = state => dotPropImmutable.get(getLayout(state), "config");
registerPublicEndpoint("reducers.layout.getLayoutConfig", getLayoutConfig);

export const getLayoutComponents = state => dotPropImmutable.get(getLayout(state), "components");
registerPublicEndpoint("reducers.layout.getLayoutComponents", getLayoutComponents);