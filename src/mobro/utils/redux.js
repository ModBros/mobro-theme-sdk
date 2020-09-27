import {FAILED, FETCHING, SUCCESS} from "mobro/utils/communication";
import {registerPublicEndpoint} from "mobro/utils/public";

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

registerPublicEndpoint("utils.redux.fetchingAction", fetchingAction);

export const getSelectorArgument = (arg) => (state, ...args) => args[arg];
registerPublicEndpoint("utils.redux.getSelectorArgument", getSelectorArgument);