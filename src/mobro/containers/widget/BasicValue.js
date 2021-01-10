import Container from "mobro/lib/component/container";
import BasicValue from "mobro/components/widget/BasicValue";

export default Container.create("widget.basic-value", BasicValue)
    .redux()
    .generate();