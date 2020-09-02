import Container from "mobro/lib/component/container";
import BasicValue from "mobro/components/component/BasicValue";

export default Container.create("component.basic-value", BasicValue)
    .redux()
    .generate();