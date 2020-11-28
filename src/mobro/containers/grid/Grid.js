import Container from "mobro/lib/component/container";
import Grid from "mobro/components/grid/Grid";
import {getLayoutConfig, getLayoutMode} from "mobro/reducers/layout";
import {layoutChange} from "mobro/actions/layout";
import dotPropImmutable from "dot-prop-immutable";
import MapDispatchToPropsEvent from "mobro/events/redux/map-dispatch-to-props-event";
import MapStateToPropsEvent from "mobro/events/redux/map-state-to-prop-event";

/**
 * @param {MapStateToPropsEvent} event
 */
const mapStateToProps = event => event.mergeMapStateToProps({
    layoutMode: getLayoutMode(event.getState()),
    rowHeight: getLayoutConfig(event.getState())?.rowHeight,
    width: getLayoutConfig(event.getState())?.width,
    height: getLayoutConfig(event.getState())?.height
});

/**
 * @param {MapDispatchToPropsEvent} event
 */
const mapDispatchToProps = event => event.mergeMapDispatchToProps({
    layoutChange: (configs) => event.dispatch(layoutChange(configs))
})

export default Container.create("grid.grid", Grid)
    .redux(mapStateToProps, mapDispatchToProps)
    .generate();