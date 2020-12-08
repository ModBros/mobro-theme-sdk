import Container from "mobro/lib/component/container";
import LayoutNames from "mobro/components/edit/header/LayoutNames";
import {
    getEditmode,
    getLayout,
    getLayoutName,
    getLayoutNames,
    getLayoutNamesFetchingState
} from "mobro/reducers/layout";
import {changeToLayoutName, deleteLayout, fetchLayoutNames} from "mobro/actions/layout";

const mapStateToProps = (state) => ({
    layout: getLayout(state),
    layoutName: getLayoutName(state),
    layoutNames: getLayoutNames(state),
    editmode: getEditmode(state),
    layoutNamesFetchingState: getLayoutNamesFetchingState(state)
});

const mapDispatchToProps = (dispatch) => ({
    fetchLayoutNames: () => dispatch(fetchLayoutNames()),
    changeLayout: (name, layout) => dispatch(changeToLayoutName(name, layout)),
    deleteLayout: (name) => dispatch(deleteLayout(name))
});

export default Container.create("edit.header.layout-names", LayoutNames)
    .basic(false)
    .connect(mapStateToProps, mapDispatchToProps)
    .generate();