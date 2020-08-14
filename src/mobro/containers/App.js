import {fetchLayout} from "mobro/actions/layout";
import {getLayout, getLayoutFetchingState} from "mobro/reducers/layout";
import App from "mobro/components/App";
import Container from "mobro/lib/component/container";

const mapStateToProps = event => event.mergeMapStateToProps({
    layoutFetchingState: getLayoutFetchingState(event.getState()),
    layout: getLayout(event.getState())
});

const mapDispatchToProps = event => event.mergeMapDispatchToProps({
    fetchLayout: () => event.dispatch(fetchLayout())
});

export default Container.create("app", App)
    .redux(mapStateToProps, mapDispatchToProps)
    .generate();