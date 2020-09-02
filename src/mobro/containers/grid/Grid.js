import Container from "mobro/lib/component/container";
import Grid from "mobro/components/grid/Grid";
import {getLayoutConfig, getLayoutMode} from "mobro/reducers/layout";
import {layoutChange} from "mobro/actions/layout";
import dotPropImmutable from "dot-prop-immutable";

const mapStateToProps = event => event.mergeMapStateToProps({
    layoutMode: getLayoutMode(event.getState()),
    rowHeight: dotPropImmutable.get(getLayoutConfig(event.getState()), "rowHeight")
});

const mapDispatchToProps = event => event.mergeMapDispatchToProps({
    layoutChange: (configs) => event.dispatch(layoutChange(configs))
})

export default Container.create("grid.grid", Grid)
    .redux(mapStateToProps, mapDispatchToProps)
    .generate();