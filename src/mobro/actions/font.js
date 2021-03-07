import {createAction} from "@reduxjs/toolkit";
import {send} from "mobro/utils/communication";
import {GET_FONT_LIST} from "mobro/enum/endpoints";
import {getFontListModified} from "mobro/reducers/font";

export const fontListRequested = createAction("font:list:requested");
export const fontListFetched = createAction("font:list:fetched");
export const fontListFailed = createAction("font:list:failed");
export const fontListModified = createAction("font:list:modified");

export function fetchFontList() {
    return function (dispatch, getState) {
        const state = getState();
        const modified = getFontListModified(state);
        const now = new Date();

        // re-fetch only every minute
        if (!modified || (now.getTime() - modified >= 60 * 60 * 1000)) {
            dispatch(fontListModified());
            dispatch(fontListRequested());

            send(GET_FONT_LIST)
                .then((response) => {
                    dispatch(fontListFetched(response));
                })
                .catch(() => {
                    dispatch(fontListFailed());
                });
        }
    }
}