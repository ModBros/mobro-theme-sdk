import {createPublicEventHook} from "mobro/utils/hooks";
import MapDispatchToPropsEvent from "mobro/events/redux/map-dispatch-to-props-event";

export const withMapDispatchToPropsHook = createPublicEventHook(
    "hooks.redux.mapDispatchToProps",
    MapDispatchToPropsEvent
);