import {createPublicSingleEventHook} from "mobro/utils/hooks";
import GlobalConfigEvent from "mobro/events/global-config-event";

export const withGlobalConfigHook = createPublicSingleEventHook(
    "hooks.globalConfig",
    GlobalConfigEvent
);