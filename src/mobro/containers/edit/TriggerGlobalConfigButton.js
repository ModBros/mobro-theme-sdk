import Container from "mobro/lib/component/container";
import MapStateToPropsEvent from "mobro/events/redux/map-state-to-prop-event";
import {getLayout, getLayoutConfig, getLayoutMode} from "mobro/reducers/layout";
import TriggerGlobalConfigButton from "mobro/components/edit/TriggerGlobalConfigButton";

/**
 * @param {MapStateToPropsEvent} event
 */
const mapStateToProps = event => event.mergeMapStateToProps({
    layoutMode: getLayoutMode(event.getState()),
    data: getLayoutConfig(event.getState())
});

export default Container.create("edit.trigger-global-config-button", TriggerGlobalConfigButton)
    .redux(mapStateToProps)
    .generate();