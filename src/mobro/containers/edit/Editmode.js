import Container from "mobro/lib/component/container";
import Editmode from "mobro/components/edit/Editmode";
import {getLayout} from "mobro/reducers/layout";
import {fetchLayoutNames, updateEditmode} from "mobro/actions/layout";

const mapStateToProps = (state) => ({
    layout: getLayout(state)
});

const mapDispatchToProps = (dispatch) => ({
    updateEditmode: (state) => dispatch(updateEditmode(state)),
    fetchLayoutNames: () => dispatch(fetchLayoutNames())
});

export default Container.create("edit.editmode", Editmode)
    .connect(mapStateToProps, mapDispatchToProps)
    .generate();