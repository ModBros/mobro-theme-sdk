import {FAILED, FETCHING, SUCCESS} from "mobro/utils/communication";

export function fetchingAction(requested, fetched, failed, fetchingState, reducer) {
    return {
        [requested]: state => ({
            ...state,
            [fetchingState]: FETCHING
        }),

        [fetched]: (state, {payload}) => ({
            ...state,
            [fetchingState]: SUCCESS,
            ...reducer(payload, state)
        }),

        [failed]: state => ({
            ...state,
            [fetchingState]: FAILED
        })
    }
}