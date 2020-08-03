import ReducersEvent from "mobro/events/redux/reducers-event";
import {createPublicSingleEventHook} from "mobro/utils/hooks";

export const withReducersHook = createPublicSingleEventHook(
    "hooks.redux.reducers",
    ReducersEvent
)