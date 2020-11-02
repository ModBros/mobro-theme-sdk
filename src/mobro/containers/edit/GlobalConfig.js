import Container from "mobro/lib/component/container";
import MapDispatchToPropsEvent from "mobro/events/redux/map-dispatch-to-props-event";
import {layoutDirectEdit, layoutEdit} from "mobro/actions/layout";
import GlobalConfig from "mobro/components/edit/GlobalConfig";
import {getLayout} from "mobro/reducers/layout";

/**
 * @param {MapStateToPropsEvent} event
 */
const mapStateToProps = event => event.mergeMapStateToProps({
    layout: getLayout(event.getState())
});

/**
 * @param {MapDispatchToPropsEvent} event
 */
const mapDispatchToProps = event => event.mergeMapDispatchToProps({
    directEdit: (payload) => event.dispatch(layoutDirectEdit(payload)),
    layoutEdit: (payload) => event.dispatch(layoutEdit(payload))
});

export default Container.create("edit.global-config", GlobalConfig)
    .redux(mapStateToProps, mapDispatchToProps)
    .generate();