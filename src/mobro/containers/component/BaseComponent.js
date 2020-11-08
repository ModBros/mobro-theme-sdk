import Container from "mobro/lib/component/container";
import BaseComponent from "mobro/components/component/BaseComponent";
import {pasteComponent, selectComponent} from "mobro/actions/layout";
import {getSelectedComponent} from "mobro/reducers/layout";

const mapStateToProps = event => event.mergeMapStateToProps({
    selectedComponent: getSelectedComponent(event.getState())
})

const mapDispatchToProps = event => event.mergeMapDispatchToProps({
    pasteComponent: pasteComponent,
    selectComponent: (path) => event.dispatch(selectComponent({path}))
});

export default Container.create("component.base-component", BaseComponent)
    .redux(mapStateToProps, mapDispatchToProps)
    .generate();