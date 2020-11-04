import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {closeSidebarComponent} from "mobro/utils/sidebar";

function Sidebar({title, name, children, footer = null}) {
    return (
        <div className="sidebar d-flex shadow">
            <div className="card sidebar-card w-100">
                <div className="card-header d-flex align-items-center justify-content-between bg-primary text-white">
                    <h5 className="m-0">
                        {title}
                    </h5>

                    <button type="button" className="btn btn-link text-light" onClick={() => closeSidebarComponent(name)}>
                        <FontAwesomeIcon icon="times"/>
                    </button>
                </div>

                <div className="card-body sidebar-body">
                    {children}
                </div>

                {!!footer && (
                    <div className={"card-footer sidebar-footer"}>
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Sidebar;