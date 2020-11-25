import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {closeSidebarComponent} from "mobro/utils/sidebar";

function Sidebar(props) {
    const {
        paddingTop,
        width,
        title,
        name,
        children,
        header = null,
        footer = null
    } = props;

    return (
        <div className="sidebar d-flex" style={{paddingTop, width}}>
            <div className="card sidebar-card w-100">
                {header ? (
                    header
                ) : (
                    <div className="card-header sidebar-header d-flex align-items-center justify-content-between text-white px-2 pt-2 pb-0">
                        <h5 className="m-0 sidebar-title">
                            {title}
                        </h5>

                        <button type="button" className="btn btn-link btn-sm text-light py-0" onClick={() => closeSidebarComponent(name)}>
                            <FontAwesomeIcon icon="times"/>
                        </button>
                    </div>
                )}

                <div className="card-body sidebar-body p-2">
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