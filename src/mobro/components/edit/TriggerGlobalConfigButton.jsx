import IconButton from "mobro/containers/edit/button/IconButton";
import {toggleSidebarComponent, withSidebar} from "mobro/utils/sidebar";
import {defaultLayoutEditConfig, isEditMode} from "mobro/utils/layout";
import {map} from "mobro/utils/helper";
import {deepValues} from "mobro/utils/object";
import Edit from "mobro/containers/edit/Edit";
import {withGlobalConfigHook} from "mobro/hooks/global-config-hook";
import React from "react";

function TriggerGlobalConfigButton(props) {
    const {
        layoutMode,
        data
    } = props;

    if (!isEditMode(layoutMode)) {
        return null;
    }

    const editConfig = withGlobalConfigHook()(defaultLayoutEditConfig);

    const
        name = "global_config",
        title = "Global Configuration",
        content = (<Edit fields={editConfig} path={""} config={data}/>),
        dependencies = map(editConfig, (field, name) => {
            return deepValues(data[name] || null);
        }).flat().join("|");

    withSidebar({name, title, content, dependencies: [dependencies]});

    return (
        <IconButton
            icon={"cog"}
            variant={"link"}
            size={"inline"}
            onClick={() => toggleSidebarComponent(name)}
        >
            Configure
        </IconButton>
    );
}

export default TriggerGlobalConfigButton;