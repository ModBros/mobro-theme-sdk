import Container from "mobro/lib/component/container";
import Sidebar from "mobro/components/edit/Sidebar";
import {getEditmode} from "mobro/reducers/layout";

const mapStateToProps = (state) => ({
    width: getEditmode(state).sidebarWidth,
    paddingTop: getEditmode(state).headerHeight
});

export default Container.create("shared.sidebar", Sidebar)
    .basic(false)
    .connect(mapStateToProps)
    .generate();