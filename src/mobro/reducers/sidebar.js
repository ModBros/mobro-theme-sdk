import {createReducer} from "@reduxjs/toolkit";
import dotPropImmutable from "dot-prop-immutable";
import {addSidebar, closeSidebar, openSidebar, removeSidebar, toggleSidebar} from "mobro/actions/sidebar";
import {v4} from "uuid";
import {registerPublicEndpoint} from "mobro/utils/public";

// ----------------------------------------------
// initial state

const initialState = {
    // contains the state of a sidebar, wether its open or not, simple boolean
    sidebars: {},

    // if a sidebar is added a second time, create a new hash for it, forces it to rerender
    sidebarHashes: {}
};

// ----------------------------------------------
// reducer

export default createReducer(initialState, {
    [addSidebar.type]: (state, {payload}) => {
        state = dotPropImmutable.set(state, `sidebarHashes.${payload}`, v4());

        // sidebar already open
        if (dotPropImmutable.get(state, `sidebars.${payload}`)) {
            return state;
        }

        return dotPropImmutable.set(state, `sidebars.${payload}`, false);
    },

    [removeSidebar.type]: (state, {payload}) => {
        state = dotPropImmutable.delete(state, `sidebarHashes.${payload}`);
        state = dotPropImmutable.delete(state, `sidebars.${payload}`);

        return state;
    },

    [openSidebar.type]: (state, {payload}) => {
        return dotPropImmutable.set(state, `sidebars.${payload}`, true);
    },

    [closeSidebar.type]: (state, {payload}) => {
        return dotPropImmutable.set(state, `sidebars.${payload}`, false);
    },

    [toggleSidebar.type]: (state, {payload}) => {
        return dotPropImmutable.toggle(state, `sidebars.${payload}`);
    }
});

// ----------------------------------------------
// selectors

export const getSidebarState = state => dotPropImmutable.get(state, "sidebar");
registerPublicEndpoint("reducers.sidebar.getSidebarState", getSidebarState);

export const getSidebars = state => dotPropImmutable.get(getSidebarState(state), "sidebars");
registerPublicEndpoint("reducers.sidebar.getSidebars", getSidebars);

export const getSidebarHashes = state => dotPropImmutable.get(getSidebarState(state), "sidebarHashes");
registerPublicEndpoint("reducers.sidebar.getSidebarHashes", getSidebarHashes);