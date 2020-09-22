import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {closeSidebarComponent} from "mobro/utils/sidebar";

function Sidebar({title, name, children}) {
    return (
        <div className="sidebar d-flex">
            <div className="card w-100">
                <div className="card-header d-flex align-items-center justify-content-between">
                    <h5 className="m-0">
                        {title}
                    </h5>

                    <button type="button" className="btn btn-link" onClick={() => closeSidebarComponent(name)}>
                        <FontAwesomeIcon icon="times"/>
                    </button>
                </div>

                <div className="card-body">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Sidebar;