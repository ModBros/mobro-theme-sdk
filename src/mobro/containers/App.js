import {fetchLayout} from "mobro/actions/layout";
import {getLayout, getLayoutFetchingState} from "mobro/reducers/layout";
import App from "mobro/components/App";
import Container from "mobro/lib/component/container";
import MapDispatchToPropsEvent from "mobro/events/redux/map-dispatch-to-props-event";
import MapStateToPropsEvent from "mobro/events/redux/map-state-to-prop-event";

/**
 * @param {MapStateToPropsEvent} event
 */
const mapStateToProps = event => event.mergeMapStateToProps({
    layoutFetchingState: getLayoutFetchingState(event.getState()),
    layout: getLayout(event.getState())
});

/**
 * @param {MapDispatchToPropsEvent} event
 */
const mapDispatchToProps = event => event.mergeMapDispatchToProps({
    fetchLayout: () => event.dispatch(fetchLayout())
});

export default Container.create("app", App)
    .redux(mapStateToProps, mapDispatchToProps)
    .generate();