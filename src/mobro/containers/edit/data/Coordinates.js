import Container from "mobro/lib/component/container";
import Coordinates from "mobro/components/edit/data/Coordinates";

export default Container.create("edit.data.coordinates", Coordinates)
    .basic(false)
    .generate();