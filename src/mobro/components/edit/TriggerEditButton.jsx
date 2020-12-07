import React from "react"
import {isEditMode} from "mobro/utils/layout";
import {toggleSidebarComponent, withSidebar} from "mobro/utils/sidebar";
import Edit from "mobro/containers/edit/Edit";
import {getComponentLabel, getDataComponentConfig} from "mobro/hooks/components-hooks";
import {map} from "mobro/utils/helper";
import {deepValues} from "mobro/utils/object";
import IconButton from "mobro/containers/edit/button/IconButton";

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

    const componentConfig = getDataComponentConfig(type);

    // extract necessary values for sidebar dependencies
    const dependencies = map(componentConfig, (field, name) => {
        return deepValues(config[name] || null);
    }).flat().join("|");

    const
        name = `edit_component_${path}`,
        title = getComponentLabel(type),
        content = (<Edit type={type} path={path} config={config}/>);

    withSidebar({name, title, content, dependencies: [dependencies]});

    return (
        <IconButton
            icon={"pen"}
            variant={"link"}
            className={"btn-sm"}
            onClick={() => toggleSidebarComponent(name)}
        />
    );
}

export default TriggerEditButton;