import React from "react"
import {isEditMode} from "mobro/utils/layout";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {closeSidebarComponent, toggleSidebarComponent, withSidebar} from "mobro/utils/sidebar";
import ComponentSelection from "mobro/containers/edit/ComponentSelection";
import IconButton from "mobro/containers/edit/button/IconButton";
import {noop} from "mobro/utils/helper";

function AddComponentButton(props) {
    const {
        path = "",
        layoutMode,
        addComponent = noop,
        canPasteComponent = false,
        pasteComponent = noop,
        allowed = []
    } = props;

    if (!isEditMode(layoutMode)) {
        return null;
    }

    const
        name = `add_component_${path}`,
        title = "Add widget",
        content = (<ComponentSelection allowed={allowed} onSelect={(type) => {
            addComponent({path, type});
            closeSidebarComponent(name);
        }}/>);

    withSidebar({name, title, content});

    return (
        <div className={"d-flex align-items-center justify-content-between"}>
            <IconButton icon={"plus"} className={"flex-fill"} onClick={() => toggleSidebarComponent(name)}>
                Add widget
            </IconButton>

            {canPasteComponent && (
                <IconButton
                    icon={"paste"}
                    className={"ml-2"}
                    onClick={() => pasteComponent(path)}
                >
                    Paste
                </IconButton>
            )}
        </div>
    );
}

export default AddComponentButton;