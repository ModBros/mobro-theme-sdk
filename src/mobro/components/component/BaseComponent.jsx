import React from "react";
import {noop} from "mobro/utils/helper";
import {getDataComponentRenderConfig} from "mobro/hooks/components-hooks";
import {isEditMode} from "mobro/utils/layout";
import {withEditSidebar} from "mobro/utils/component";

function BaseComponent(props) {
    const {
        type,
        path,
        config,
        Component,
        layoutMode,
        selectedComponent,
        selectComponent = noop
    } = props;

    const renderConfig = getDataComponentRenderConfig(type);
    const baseClassNames = !renderConfig?.ignoreBaseClassNames ? "component card" : "";

    let defaultClasses = "";
    let doSelectComponent = noop;
    let toggleEditSidebar = noop;

    if(isEditMode(layoutMode)) {
        defaultClasses = "clickable";
        doSelectComponent = () => selectComponent(path);
        toggleEditSidebar = withEditSidebar({path, type, config});
    }

    return (
        <div
            className={`${defaultClasses} ${baseClassNames} ${renderConfig?.baseClassNames} ${selectedComponent === path ? "selection-indicator" : ""}`}
            onClick={doSelectComponent}
            onDoubleClick={toggleEditSidebar}
        >
            <div className="component-body card-body">
                <Component path={path} config={config}/>
            </div>
        </div>
    );
}

export default BaseComponent;