import {NOT_ASKED} from "mobro/utils/communication";
import {createReducer, createSelector} from "@reduxjs/toolkit";
import dotPropImmutable from "dot-prop-immutable";
import {fetchingAction} from "mobro/utils/redux";
import {fontListFailed, fontListFetched, fontListModified, fontListRequested} from "mobro/actions/font";
import {registerPublicEndpoint} from "mobro/utils/public";
import {BOLD, ITALIC, REGULAR} from "mobro/enum/font-style";

// ----------------------------------------------
// initial state

const initialState = {
    fontList: [],
    fontListFetchingState: NOT_ASKED,
    fontListModified: null
};

// ----------------------------------------------
// reducer

export default createReducer(initialState, {
    [fontListModified.type]: (state) => {
        return dotPropImmutable.set(state, "fontListModified", new Date().getTime());
    },

    ...fetchingAction(fontListRequested.type, fontListFetched.type, fontListFailed.type, "fontListFetchingState", (payload) => ({
        fontList: payload
    }))
});

// ----------------------------------------------
// selectors
export const getFontState = state => state.font;
registerPublicEndpoint("reducers.font.getFontState", getFontState);

export const getFontListFetchingState = state => getFontState(state).fontListFetchingState;
registerPublicEndpoint("reducers.font.getFontListFetchingState", getFontListFetchingState);

export const getFontListModified = state => getFontState(state).fontListModified;
registerPublicEndpoint("reducers.font.getFontListModified", getFontListModified);

export const getRawFontList = state => getFontState(state).fontList;

export const getFontList = createSelector(
    [getRawFontList],
    (fontList) => {
        const fonts = {};

        for (const font of fontList) {
            if (!fonts[font.family]) {
                fonts[font.family] = {
                    fonts: [],
                    styles: [BOLD, ITALIC]
                }
            }

            fonts[font.family].fonts.push(font);

            if (fonts[font.family].styles.indexOf(font.style) === -1) {
                fonts[font.family].styles.push(font.style);
            }
        }

        return fonts;
    }
);
registerPublicEndpoint("reducers.font.getFontList", getFontList);