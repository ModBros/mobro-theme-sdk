import Container from "mobro/lib/component/container";
import Sidebar from "mobro/components/edit/Sidebar";

export default Container.create("shared.sidebar", Sidebar)
    .basic(false)
    .generate();