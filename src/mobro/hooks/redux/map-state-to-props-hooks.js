import {createPublicEventHook} from "mobro/utils/hooks";
import MapStateToPropsEvent from "mobro/events/redux/map-state-to-prop-event";

export const withMapStateToPropsHook = createPublicEventHook(
    "hooks.redux.mapStateToProps",
    MapStateToPropsEvent
);