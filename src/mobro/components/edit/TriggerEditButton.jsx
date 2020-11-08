import React, {Fragment} from "react"
import {isEditMode} from "mobro/utils/layout";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {toggleSidebarComponent, withSidebar} from "mobro/utils/sidebar";
import Edit from "mobro/containers/edit/Edit";
import {getDataComponentConfig} from "mobro/hooks/components-hooks";
import {empty, map} from "mobro/utils/helper";
import {deepValues} from "mobro/utils/object";
import Footer from "mobro/containers/edit/Footer";
import IconButton from "mobro/containers/shared/button/IconButton";

function TriggerEditButton({layoutMode, type, path, config}) {
    if (!isEditMode(layoutMode)) {
        return null;
    }

    const componentConfig = getDataComponentConfig(type);

    // extract necessary values for sidebar dependencies
    const dependencies = map(componentConfig, (field, name) => {
        return deepValues(config[name] || null);
    }).flat().join("|");

    const
        name = `edit_component_${path}`,
        title = "Configure",
        content = (<Edit type={type} path={path} config={config}/>),
        footer = (<Footer path={path}/>);

    withSidebar({name, title, content, footer, dependencies: [dependencies]});

    return (
        <IconButton
            icon={"cog"}
            variant={"link"}
            className={"btn-sm"}
            onClick={() => toggleSidebarComponent(name)}
        />
    );
}

export default TriggerEditButton;