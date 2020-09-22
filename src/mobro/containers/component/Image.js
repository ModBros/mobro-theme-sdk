import Container from "mobro/lib/component/container";
import Image from "mobro/components/component/Image";

export default Container.create("component.image", Image)
    .redux()
    .generate();