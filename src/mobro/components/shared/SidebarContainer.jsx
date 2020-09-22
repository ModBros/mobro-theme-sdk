import {Fragment} from "react";
import {getSidebarComponent} from "mobro/utils/sidebar";

function SidebarContainer({sidebars}) {
    return (
        <div className="sidebar-container">
            {Object.entries(sidebars).map(([sidebar, open]) => (
                <Fragment key={sidebar}>
                    {open ? getSidebarComponent(sidebar) : null}
                </Fragment>
            ))}
        </div>
    );
}

export default SidebarContainer;