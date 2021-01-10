import Container from "mobro/lib/component/container";
import Widgets from "mobro/components/edit/data/Widgets";

export default Container.create("edit.data.components", Widgets)
    .basic(false)
    .generate()