import {createReducer} from "@reduxjs/toolkit";
import {fetchingAction} from "mobro/utils/redux";
import {
    adaptToDeviceResolution,
    addComponent,
    copyComponent, duplicateComponent,
    layoutChange, layoutDelete,
    layoutEdit,
    layoutFailed,
    layoutFetched,
    layoutMode,
    layoutNameChange,
    layoutNamesFailed,
    layoutNamesFetched,
    layoutNamesRequested,
    layoutRequested,
    layoutUpdate,
    moveComponent,
    pasteComponent,
    removeComponent,
    selectComponent, setZoomLevel,
    updateEditmode
} from "mobro/actions/layout";
import {NOT_ASKED} from "mobro/utils/communication";
import {defaultLayoutConfig, isEditMode, saveLayout} from "mobro/utils/layout";
import dotPropImmutable from "dot-prop-immutable";
import {DEFAULT_LAYOUT_NAME, LAYOUT_MODE_DISPLAY} from "mobro/enum/layout";
import {registerPublicEndpoint} from "mobro/utils/public";
import {getWidgetDefaultValue} from "mobro/hooks/components-hooks";
import {getComponentConfigPath} from "mobro/utils/component";
import {empty} from "mobro/utils/helper";
import {ZOOM_LEVEL_M} from "mobro/enum/zoom-levels";
import {getDeviceResolution} from "mobro/utils/socket";

// ----------------------------------------------
// initial state

const initialState = {
    layoutFetchingState: NOT_ASKED,
    layoutNamesFetchingState: NOT_ASKED,
    layoutMode: LAYOUT_MODE_DISPLAY,
    layoutNames: [DEFAULT_LAYOUT_NAME],
    layoutName: DEFAULT_LAYOUT_NAME,
    layout: defaultLayoutConfig(),
    selectedComponent: null,
    componentTemporaryStorage: null,
    zoomLevel: ZOOM_LEVEL_M,
    editmode: {
        headerHeight: 0,
        sidebarWidth: 0
    }
};

function doSaveLayout(layoutName, layout) {
    try {
        saveLayout(JSON.parse(JSON.stringify({layoutName, layout})));
    } catch (exception) {
        console.error("could not save layout :(");
        console.error(exception);
    }
}

// ----------------------------------------------
// reducer

export default createReducer(initialState, {
    [layoutMode.type]: (state, {payload}) => dotPropImmutable.set(state, "layoutMode", payload),

    [layoutUpdate.type]: (state, {payload}) => {
        if (!Array.isArray(payload)) {
            return state;
        }

        payload.forEach((item, i) => {
            state = dotPropImmutable.merge(state, getComponentConfigPath(`layout.components.${i}`), item);
        });

        doSaveLayout(state.layoutName, state.layout);

        return state;
    },

    [layoutNameChange.type]: (state, {payload}) => {
        state = dotPropImmutable.set(state, "layoutName", payload);

        if (state.layoutNames && !state.layoutNames.includes(payload)) {
            state = dotPropImmutable.merge(state, "layoutNames", [payload]);
        }

        return state;
    },

    [layoutChange.type]: (state, {payload}) => {
        const {layoutName, layout} = payload;

        state = dotPropImmutable.set(state, "layout", !empty(layout) ? layout : defaultLayoutConfig());

        if (layoutName) {
            state = dotPropImmutable.set(state, "layoutName", layoutName);
        }

        return state;
    },

    [layoutDelete.type]: (state, {payload}) => {
        if (empty(state.layoutNames)) {
            return state;
        }

        const index = state.layoutNames.indexOf(payload);

        if (index === -1) {
            return state;
        }

        return dotPropImmutable.delete(state, `layoutNames.${index}`);
    },

    ...fetchingAction(layoutRequested.type, layoutFetched.type, layoutFailed.type, "layoutFetchingState", (payload) => {
        const state = {layoutName: payload.layoutName};

        if (!empty(payload.layout)) {
            state.layout = payload.layout;
        }

        return state;
    }),

    ...fetchingAction(layoutNamesRequested.type, layoutNamesFetched.type, layoutNamesFailed.type, "layoutNamesFetchingState", (payload) => {
        return {
            layoutNames: payload
        };
    }),

    [layoutEdit.type]: (state, {payload}) => {
        const {path = "", name, data} = payload;

        state = dotPropImmutable.set(state, getComponentConfigPath(`layout${path}`, name), data);
        doSaveLayout(state.layoutName, state.layout);

        return state;
    },

    [adaptToDeviceResolution.type]: (state) => {
        const {width, height} = getDeviceResolution();

        if (!width || !height) {
            return state;
        }

        state = dotPropImmutable.set(state, getComponentConfigPath('layout', "width"), width);
        state = dotPropImmutable.set(state, getComponentConfigPath('layout', "height"), height);

        return state;
    },

    [selectComponent.type]: (state, {payload}) => {
        if (isEditMode(state.layoutMode)) {
            const {path} = payload;

            return dotPropImmutable.set(state, `selectedComponent`, path);
        }
    },

    [addComponent.type]: (state, {payload}) => {
        let {path = "", type} = payload;

        path += ".components";

        // force given path to be an array if it does not exist yet
        state = dotPropImmutable.set(state, `layout${path}`, dotPropImmutable.get(state, `layout${path}`, []));

        state = dotPropImmutable.merge(state, `layout${path}`, {
            type: type,
            config: getWidgetDefaultValue(type)
        });

        doSaveLayout(state.layoutName, state.layout);

        return state;
    },

    [moveComponent]: (state, {payload}) => {
        const {sourcePath, destinationPath} = payload;

        const accessSourcePath = `layout${sourcePath}`;
        const accessDestinationPath = `layout${destinationPath}`;

        const source = dotPropImmutable.get(state, accessSourcePath);
        const destination = dotPropImmutable.get(state, accessDestinationPath);

        state = dotPropImmutable.set(state, accessSourcePath, destination);
        state = dotPropImmutable.set(state, "selectedComponent", destinationPath);
        state = dotPropImmutable.set(state, accessDestinationPath, source);

        doSaveLayout(state.layoutName, state.layout);

        return state;
    },

    [removeComponent.type]: (state, {payload}) => {
        const {path} = payload;

        state = dotPropImmutable.delete(state, `layout${path}`);

        doSaveLayout(state.layoutName, state.layout);

        return state;
    },

    [copyComponent.type]: (state, {payload}) => {
        const {type, config} = payload;

        dotPropImmutable.set(state, "componentTemporaryStorage", {type, config});
    },

    [pasteComponent.type]: (state, {payload}) => {
        const {path = ""} = payload;
        const {type, config} = state.componentTemporaryStorage;

        state = dotPropImmutable.merge(state, `layout${path}.components`, {type, config});

        doSaveLayout(state.layoutName, state.layout);

        return state;
    },

    [duplicateComponent.type]: (state, {payload}) => {
        const {
            path = "",
            type,
            config
        } = payload;

        state = dotPropImmutable.merge(state, `layout${path}.components`, {type, config});

        doSaveLayout(state.layoutName, state.layout);

        return state;
    },

    [updateEditmode.type]: (state, {payload}) => {
        return dotPropImmutable.merge(state, "editmode", payload);
    },

    [setZoomLevel.type]: (state, {payload}) => {
        return dotPropImmutable.set(state, "zoomLevel", payload);
    }
});

// ----------------------------------------------
// selectors

export const getLayoutState = state => dotPropImmutable.get(state, "layout");
registerPublicEndpoint("reducers.layout.getLayoutState", getLayoutState);

export const getLayoutFetchingState = state => dotPropImmutable.get(getLayoutState(state), "layoutFetchingState");
registerPublicEndpoint("reducers.layout.getLayoutFetchingState", getLayoutFetchingState);

export const getLayoutNamesFetchingState = state => dotPropImmutable.get(getLayoutState(state), "layoutNamesFetchingState");
registerPublicEndpoint("reducers.layout.getLayoutNamesFetchingState", getLayoutNamesFetchingState);

export const getLayoutNames = state => dotPropImmutable.get(getLayoutState(state), "layoutNames");
registerPublicEndpoint("reducers.layout.getLayoutNames", getLayoutNames);

export const getLayoutName = state => dotPropImmutable.get(getLayoutState(state), "layoutName");
registerPublicEndpoint("reducers.layout.getLayoutName", getLayoutName);

export const getLayout = state => dotPropImmutable.get(getLayoutState(state), "layout");
registerPublicEndpoint("reducers.layout.getLayout", getLayout);

export const getLayoutMode = state => dotPropImmutable.get(getLayoutState(state), "layoutMode");
registerPublicEndpoint("reducers.layout.getLayoutMode", getLayoutMode);

export const getLayoutConfig = state => dotPropImmutable.get(getLayout(state), "config");
registerPublicEndpoint("reducers.layout.getLayoutConfig", getLayoutConfig);

export const getSelectedComponent = state => dotPropImmutable.get(getLayoutState(state), "selectedComponent");
registerPublicEndpoint("reducers.layout.getSelectedComponent", getSelectedComponent);

export const getLayoutComponentTemporaryStorage = state => dotPropImmutable.get(getLayoutState(state), "componentTemporaryStorage");
registerPublicEndpoint("reducers.layout.getLayoutComponentTemporaryStorage", getLayoutComponentTemporaryStorage);

export const getEditmode = state => dotPropImmutable.get(getLayoutState(state), "editmode");
export const getZoomLevel = state => getLayoutState(state).zoomLevel;
