import {createReducer} from "@reduxjs/toolkit";
import {fetchingAction} from "mobro/utils/redux";
import {
    addComponent,
    copyComponent,
    layoutChange,
    layoutEdit,
    layoutFailed,
    layoutFetched,
    layoutMode,
    layoutRequested,
    pasteComponent,
    removeComponent, selectComponent
} from "mobro/actions/layout";
import {NOT_ASKED} from "mobro/utils/communication";
import {defaultLayoutConfig, saveLayout} from "mobro/utils/layout";
import dotPropImmutable from "dot-prop-immutable";
import {LAYOUT_MODE_DISPLAY} from "mobro/enum/layout";
import {registerPublicEndpoint} from "mobro/utils/public";
import {getDataComponentDefaultValue} from "mobro/hooks/components-hooks";

// ----------------------------------------------
// initial state

const initialState = {
    layoutFetchingState: NOT_ASKED,
    layoutMode: LAYOUT_MODE_DISPLAY,
    layout: defaultLayoutConfig,
    selectedComponent: null,
    componentTemporaryStorage: null
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

    [selectComponent.type]: (state, {payload}) => {
        const {path} = payload;

        return dotPropImmutable.set(state, `selectedComponent`, path !== state.selectedComponent ? path : null);
    },

    [addComponent.type]: (state, {payload}) => {
        const {path = "", type} = payload;

        return dotPropImmutable.merge(state, `layout${path}.components`, {
            type: type,
            config: getDataComponentDefaultValue(type)
        });
    },

    [removeComponent.type]: (state, {payload}) => {
        const {path} = payload;

        return dotPropImmutable.delete(state, `layout${path}`);
    },

    [copyComponent.type]: (state, {payload}) => {
        const {type, config} = payload;

        return dotPropImmutable.set(state, "componentTemporaryStorage", {type, config});
    },

    [pasteComponent.type]: (state) => {
        const {type, config} = state.componentTemporaryStorage;

        return dotPropImmutable.merge(state, "layout.components", {type, config});
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

export const getSelectedComponent = state => dotPropImmutable.get(getLayoutState(state), "selectedComponent");
registerPublicEndpoint("reducers.layout.getSelectedComponent", getSelectedComponent);

export const getLayoutComponents = state => dotPropImmutable.get(getLayout(state), "components");
registerPublicEndpoint("reducers.layout.getLayoutComponents", getLayoutComponents);

export const getLayoutComponentTemporaryStorage = state => dotPropImmutable.get(getLayoutState(state), "componentTemporaryStorate");
registerPublicEndpoint("reducers.layout.getLayoutComponentTemporaryStorage", getLayoutComponentTemporaryStorage);
