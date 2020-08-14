import Container from "mobro/lib/component/container";
import PositionableComponent from "mobro/components/component/PositionableComponent";

export default Container.create("component.positionable-component", PositionableComponent)
    .redux()
    .generate();