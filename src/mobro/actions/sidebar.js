import {createAction} from "@reduxjs/toolkit";

export const addSidebar = createAction("sidebar:add");
export const removeSidebar = createAction("sidebar:remove");
export const openSidebar = createAction("sidebar:open");
export const closeSidebar = createAction("sidebar:close");
export const toggleSidebar = createAction("sidebar:toggle");