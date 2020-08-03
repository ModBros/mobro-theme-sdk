import {createPublicEventHook} from "mobro/utils/hooks";
import MergePropsEvent from "mobro/events/redux/merge-props-event";

export const withMergePropsHook = createPublicEventHook(
    "hooks.redux.mergeProps",
    MergePropsEvent
);