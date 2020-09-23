import Container from "mobro/lib/component/container";
import {getSidebarHashes, getSidebars} from "mobro/reducers/sidebar";
import MapStateToPropsEvent from "mobro/events/redux/map-state-to-prop-event";
import SidebarContainer from "mobro/components/shared/SidebarContainer";

/**
 * @param {MapStateToPropsEvent} event
 */
const mapStateToProps = event => event.mergeMapStateToProps({
    sidebars: getSidebars(event.getState()),
    sidebarHashes: getSidebarHashes(event.getState())
});

export default Container.create("shared.sidebar-container", SidebarContainer)
    .redux(mapStateToProps)
    .generate();