import {createReducer} from "@reduxjs/toolkit";
import dotPropImmutable from "dot-prop-immutable";
import {addSidebar, closeSidebar, openSidebar, removeSidebar, toggleSidebar} from "mobro/actions/sidebar";

// ----------------------------------------------
// initial state

const initialState = {
    sidebars: {}
};

// ----------------------------------------------
// reducer

export default createReducer(initialState, {
    [addSidebar.type]: (state, {payload}) => {
        return dotPropImmutable.set(state, `sidebars.${payload}`, false);
    },

    [removeSidebar.type]: (state, {payload}) => {
        return dotPropImmutable.delete(state, `sidebars.${payload}`);
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
export const getSidebars = state => dotPropImmutable.get(getSidebarState(state), "sidebars");