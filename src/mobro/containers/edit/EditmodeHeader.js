import Container from "mobro/lib/component/container";
import EditmodeHeader from "mobro/components/edit/EditmodeHeader";
import {layoutEdit} from "mobro/actions/layout";
import {getLayoutConfig} from "mobro/reducers/layout";

const mapStateToProps = (state) => ({
    layoutConfig: getLayoutConfig(state)
});

const mapDispatchToProps = (dispatch) => ({
    layoutEdit: ({name, data}) => dispatch(layoutEdit({path: "", name, data}))
});

export default Container.create("edit.editmode-header", EditmodeHeader)
    .basic(false)
    .connect(mapStateToProps, mapDispatchToProps)
    .generate();