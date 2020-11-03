import Container from "mobro/lib/component/container";
import BaseComponent from "mobro/components/component/BaseComponent";
import {pasteComponent} from "mobro/actions/layout";

const mapDispatchToProps = event => event.mergeMapDispatchToProps({
    pasteComponent: pasteComponent
});

export default Container.create("component.base-component", BaseComponent)
    .redux(null, mapDispatchToProps)
    .generate();