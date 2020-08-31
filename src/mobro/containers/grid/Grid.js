import Container from "mobro/lib/component/container";
import Grid from "mobro/components/grid/Grid";
import {getLayoutMode} from "mobro/reducers/layout";
import {fetchLayout, layoutChange} from "mobro/actions/layout";

const mapStateToProps = event => event.mergeMapStateToProps({
    layoutMode: getLayoutMode(event.getState())
});

const mapDispatchToProps = event => event.mergeMapDispatchToProps({
    layoutChange: (configs) => event.dispatch(layoutChange(configs))
})

export default Container.create("grid.grid", Grid)
    .redux(mapStateToProps, mapDispatchToProps)
    .generate();