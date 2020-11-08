import Container from "mobro/lib/component/container";
import Editmode from "mobro/components/edit/Editmode";
import {getLayoutComponents} from "mobro/reducers/layout";

const mapStateToProps = event => event.mergeMapStateToProps({
    components: getLayoutComponents(event.getState())
});

export default Container.create("edit.editmode", Editmode)
    .redux(mapStateToProps)
    .generate();