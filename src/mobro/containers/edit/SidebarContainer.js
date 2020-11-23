import Container from "mobro/lib/component/container";
import {getSidebarHashes, getSidebars} from "mobro/reducers/sidebar";
import SidebarContainer from "mobro/components/edit/SidebarContainer";

const mapStateToProps = (state) => ({
    sidebars: getSidebars(state),
    sidebarHashes: getSidebarHashes(state)
});

export default Container.create("shared.sidebar-container", SidebarContainer)
    .basic(false)
    .connect(mapStateToProps)
    .generate();