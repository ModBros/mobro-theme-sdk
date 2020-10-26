import React from "react"
import {isEditMode} from "mobro/utils/layout";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {toggleSidebarComponent, withSidebar} from "mobro/utils/sidebar";
import ComponentSelection from "mobro/containers/edit/ComponentSelection";

function AddComponentButton({layoutMode, addComponent}) {
    if (!isEditMode(layoutMode)) {
        return null;
    }

    const
        name = `add_component`,
        title = "Add Component",
        content = (<ComponentSelection onSelect={addComponent}/>);

    withSidebar({name, title, content});

    return (
        <button type="button" className="btn btn-sm btn-round btn-primary" onClick={() => toggleSidebarComponent(name)}>
            <FontAwesomeIcon icon="plus"/>
        </button>
    );
}

export default AddComponentButton;