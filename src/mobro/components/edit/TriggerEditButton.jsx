import React from "react"
import {isEditMode} from "mobro/utils/layout";
import IconButton from "mobro/containers/edit/button/IconButton";
import {withEditSidebar} from "mobro/utils/component";

function TriggerEditButton(props) {
    const {
        layoutMode,
        type,
        path,
        config
    } = props;

    if (!isEditMode(layoutMode)) {
        return null;
    }

    const toggleSidebar = withEditSidebar({path, type, config});

    return (
        <IconButton
            icon={"pen"}
            variant={"link"}
            className={"btn-sm"}
            onClick={toggleSidebar}
        />
    );
}

export default TriggerEditButton;