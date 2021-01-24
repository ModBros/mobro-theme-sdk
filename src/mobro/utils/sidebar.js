import {registerPublicEndpoint} from "mobro/utils/public";
import {dispatch} from "mobro/reducers";
import {
    addSidebar,
    closeSidebar,
    closeSidebarsStartingWith,
    openSidebar,
    removeSidebar,
    toggleSidebar
} from "mobro/actions/sidebar";
import Sidebar from "mobro/containers/edit/Sidebar";
import {useEffect} from "react";

const _sidebars = {};

/**
 * @param name
 * @param title
 * @param content
 * @param props
 */
export function withSidebar({name, title, content, header = null, footer = null, close = true, dependencies = []}) {
    useEffect(() => {
        // on a dependency change re-add the sidebar --> updates hash --> rerender
        addSidebarComponent(name, (
            <Sidebar name={name} title={title} header={header} close={close} footer={footer}>
                {content}
            </Sidebar>
        ));
    }, dependencies);

    // remove sidebar on unmount
    useEffect(() => () => {
        removeSidebarComponent(name)
    }, []);
}

registerPublicEndpoint("utils.sidebar.withSidebar", withSidebar);

/**
 * @param {string} name
 * @returns {string}
 */
function sanitizeName(name) {
    if (!name) {
        return name;
    }

    return name.replace(/\./g, "_");
}

/**
 * @param name
 * @returns {*}
 */
export function getSidebarComponent(name) {
    return _sidebars[sanitizeName(name)];
}

registerPublicEndpoint("utils.sidebar.getSidebarComponent", getSidebarComponent);

export function addSidebarComponent(name, sidebar) {
    _sidebars[sanitizeName(name)] = sidebar;

    dispatch(addSidebar(sanitizeName(name)));
}

registerPublicEndpoint("utils.sidebar.addSidebarComponent", addSidebarComponent);

export function removeSidebarComponent(name) {
    delete _sidebars[sanitizeName(name)];

    dispatch(removeSidebar(sanitizeName(name)));
}

registerPublicEndpoint("utils.sidebar.removeSidebarComponent", removeSidebarComponent);

export function openSidebarComponent(name) {
    dispatch(openSidebar(sanitizeName(name)));
}

registerPublicEndpoint("utils.sidebar.openSidebarComponent", openSidebarComponent);

export function closeSidebarComponent(name) {
    dispatch(closeSidebar(sanitizeName(name)));
}

registerPublicEndpoint("utils.sidebar.closeSidebarComponent", closeSidebarComponent);

export function toggleSidebarComponent(name) {
    dispatch(toggleSidebar(sanitizeName(name)));
}

registerPublicEndpoint("utils.sidebar.toggleSidebarComponent", toggleSidebarComponent);

export function closeSidebarComponentsStartingWith(name) {
    dispatch(closeSidebarsStartingWith(sanitizeName(name)));
}

registerPublicEndpoint("utils.sidebar.closeSidebarComponentsStartingWith", closeSidebarComponentsStartingWith);