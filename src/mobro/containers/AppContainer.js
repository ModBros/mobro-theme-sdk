import Container from "mobro/lib/component/container";
import AppContainer from "mobro/components/AppContainer";
import {getLayoutConfig, getZoomLevel} from "mobro/reducers/layout";
import {getLayoutMode} from 'mobro/reducers/layout'

/**
 * @param {MapStateToPropsEvent} event
 */
const mapStateToProps = event => event.mergeMapStateToProps({
    config: getLayoutConfig(event.getState()),
    layoutMode: getLayoutMode(event.getState()),
    zoomLevel: getZoomLevel(event.getState())
});

export default Container.create("container", AppContainer)
    .redux(mapStateToProps)
    .generate();