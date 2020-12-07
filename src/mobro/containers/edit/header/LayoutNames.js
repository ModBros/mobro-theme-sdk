import Container from "mobro/lib/component/container";
import LayoutNames from "mobro/components/edit/header/LayoutNames";
import {getEditmode, getLayoutName, getLayoutNames, getLayoutNamesFetchingState} from "mobro/reducers/layout";
import {fetchLayoutNames} from "mobro/actions/layout";

const mapStateToProps = (state) => ({
    layoutName: getLayoutName(state),
    layoutNames: getLayoutNames(state),
    editmode: getEditmode(state),
    layoutNamesFetchingState: getLayoutNamesFetchingState(state)
});

const mapDispatchToProps = (dispatch) => ({
    fetchLayoutNames: () => dispatch(fetchLayoutNames()),
    changeLayout: () => dispatch()
});

export default Container.create("edit.header.layout-names", LayoutNames)
    .basic(false)
    .connect(mapStateToProps, mapDispatchToProps)
    .generate();