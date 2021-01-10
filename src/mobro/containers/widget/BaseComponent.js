import Container from "mobro/lib/component/container";
import BaseComponent from "mobro/components/widget/BaseComponent";
import {selectComponent} from "mobro/actions/layout";
import {getLayoutMode, getSelectedComponent} from "mobro/reducers/layout";

const mapStateToProps = event => event.mergeMapStateToProps({
    selectedComponent: getSelectedComponent(event.getState()),
    layoutMode: getLayoutMode(event.getState())
})

const mapDispatchToProps = event => event.mergeMapDispatchToProps({
    selectComponent: (path) => event.dispatch(selectComponent({path}))
});

export default Container.create("widget.base-component", BaseComponent)
    .redux(mapStateToProps, mapDispatchToProps)
    .generate();