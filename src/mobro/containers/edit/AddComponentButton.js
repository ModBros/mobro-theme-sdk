import Container from "mobro/lib/component/container";
import MapStateToPropsEvent from "mobro/events/redux/map-state-to-prop-event";
import {getLayoutMode} from "mobro/reducers/layout";
import AddComponentButton from "mobro/components/edit/AddComponentButton";
import {addComponent} from "mobro/actions/layout";

/**
 * @param {MapStateToPropsEvent} event
 */
const mapStateToProps = event => event.mergeMapStateToProps({
    layoutMode: getLayoutMode(event.getState())
});

/**
 * @param {MapDispatchToPropsEvent} event
 */
const mapDispatchToProps = event => event.mergeMapDispatchToProps({
    addComponent: (type) => event.dispatch(addComponent(type))
})

export default Container.create("edit.trigger-edit-button", AddComponentButton)
    .redux(mapStateToProps, mapDispatchToProps)
    .generate();