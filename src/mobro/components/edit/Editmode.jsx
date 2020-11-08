import ComponentsBar from "mobro/containers/edit/ComponentsBar";
import AddComponentButton from "mobro/containers/edit/AddComponentButton";
import TriggerGlobalConfigButton from "mobro/containers/edit/TriggerGlobalConfigButton";
import React from "react";

function Editmode(props) {
    const {
        components,
        children
    } = props;

    return (
        <div className={"editmode d-flex flex-column w-100"}>
            <div className={"d-flex flex-fill mh-100"}>
                <div className={"d-flex flex-column flex-fill"}>
                    <div className={"editmode-header bg-gray-100 p-2 mb-3 d-flex align-items-center"}>
                        <small className={"flex-fill"}>
                            MoBro Theme Explorer
                        </small>

                        <small>
                            <TriggerGlobalConfigButton/>
                        </small>
                    </div>

                    <div className={"flex-fill d-flex justify-content-center"}>
                        {children}
                    </div>
                </div>

                <div className={"editmode-sidebar d-flex flex-column"}>
                    <div className={"flex-fill editmode-sidebar-body"}>
                        <ComponentsBar components={components}/>
                    </div>

                    <div className={"editmode-sidebar-footer card-footer"}>
                        <AddComponentButton/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Editmode;