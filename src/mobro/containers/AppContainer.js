import Container from "mobro/lib/component/container";
import AppContainer from "mobro/components/AppContainer";
import {getLayoutConfig} from "mobro/reducers/layout";

/**
 * @param {MapStateToPropsEvent} event
 */
const mapStateToProps = event => event.mergeMapStateToProps({
    config: getLayoutConfig(event.getState())
});

export default Container.create("container", AppContainer)
    .redux(mapStateToProps)
    .generate();