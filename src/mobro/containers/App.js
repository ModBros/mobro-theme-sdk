import {fetchLayout, layoutMode} from "mobro/actions/layout";
import {getLayout, getLayoutConfig, getLayoutFetchingState, getLayoutMode} from "mobro/reducers/layout";
import App from "mobro/components/App";
import Container from "mobro/lib/component/container";
import MapDispatchToPropsEvent from "mobro/events/redux/map-dispatch-to-props-event";
import MapStateToPropsEvent from "mobro/events/redux/map-state-to-prop-event";

/**
 * @param {MapStateToPropsEvent} event
 */
const mapStateToProps = event => event.mergeMapStateToProps({
    layoutFetchingState: getLayoutFetchingState(event.getState()),
    layout: getLayout(event.getState()),
    layoutMode: getLayoutMode(event.getState()),
    config: getLayoutConfig(event.getState())
});

/**
 * @param {MapDispatchToPropsEvent} event
 */
const mapDispatchToProps = event => event.mergeMapDispatchToProps({
    fetchLayout: () => event.dispatch(fetchLayout()),
    setLayoutMode: (mode) => event.dispatch(layoutMode(mode))
});

export default Container.create("app", App)
    .redux(mapStateToProps, mapDispatchToProps)
    .generate();