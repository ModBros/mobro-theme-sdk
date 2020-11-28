import Container from "mobro/lib/component/container";
import ComponentLabel from "mobro/components/shared/ComponentLabel";

export default Container.create("shared.component-label", ComponentLabel)
    .redux()
    .generate();