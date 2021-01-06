import Container from "mobro/lib/component/container";
import BasicValue from "mobro/components/widget/BasicValue";

export default Container.create("component.basic-value", BasicValue)
    .redux()
    .generate();