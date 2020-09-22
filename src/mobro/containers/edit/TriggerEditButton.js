import Container from "mobro/lib/component/container";
import MapStateToPropsEvent from "mobro/events/redux/map-state-to-prop-event";
import {getLayoutMode} from "mobro/reducers/layout";
import TriggerEditButton from "mobro/components/edit/TriggerEditButton";

/**
 * @param {MapStateToPropsEvent} event
 */
const mapStateToProps = event => event.mergeMapStateToProps({
    layoutMode: getLayoutMode(event.getState())
});

export default Container.create("edit.trigger-edit-button", TriggerEditButton)
    .redux(mapStateToProps)
    .generate();