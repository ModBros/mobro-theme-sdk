import React, {Fragment} from "react"
import {isEditMode} from "mobro/utils/layout";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {toggleSidebarComponent, withSidebar} from "mobro/utils/sidebar";
import Edit from "mobro/containers/edit/Edit";
import {getDataComponentConfig} from "mobro/hooks/components-hooks";
import {empty, map} from "mobro/utils/helper";
import {deepValues} from "mobro/utils/object";

function TriggerEditButton({layoutMode, type, path, config}) {
    if (!isEditMode(layoutMode)) {
        return null;
    }

    const componentConfig = getDataComponentConfig(type);

    // nothing to configure
    if (empty(componentConfig)) {
        return null;
    }

    // extract necessary values for sidebar dependencies
    const dependencies = map(componentConfig, (field, name) => {
        return deepValues(config[name] || null);
    }).flat();

    const
        name = `edit_component_${path}`,
        title = "Configure",
        content = (<Edit type={type} path={path} config={config}/>);

    withSidebar({name, title, content, dependencies});

    return (
        <Fragment>
            <button type="button" className="btn btn-link btn-sm trigger-edit-button"
                    onClick={() => toggleSidebarComponent(name)}>
                <FontAwesomeIcon icon="cog"/>
            </button>
        </Fragment>
    );
}

export default TriggerEditButton;