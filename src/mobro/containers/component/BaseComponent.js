import Container from "mobro/lib/component/container";
import BaseComponent from "mobro/components/component/BaseComponent";

export default Container.create("component.base-component", BaseComponent)
    .redux()
    .generate();