import Container from "mobro/lib/component/container";
import Components from "mobro/components/edit/data/Components";

export default Container.create("edit.data.components", Components)
    .basic(false)
    .generate()