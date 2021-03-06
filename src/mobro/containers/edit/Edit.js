import Container from "mobro/lib/component/container";
import Edit from "mobro/components/edit/Edit";
import MapDispatchToPropsEvent from "mobro/events/redux/map-dispatch-to-props-event";
import {layoutEdit} from "mobro/actions/layout";

/**
 * @param {MapDispatchToPropsEvent} event
 */
const mapDispatchToProps = event => event.mergeMapDispatchToProps({
    layoutEdit: (payload) => event.dispatch(layoutEdit(payload))
});

export default Container.create("edit.edit", Edit)
    .redux(null, mapDispatchToProps)
    .generate();