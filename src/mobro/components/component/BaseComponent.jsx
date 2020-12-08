import React from "react";
import {noop} from "mobro/utils/helper";
import {getDataComponentRenderConfig} from "mobro/hooks/components-hooks";

function BaseComponent(props) {
    const {
        type,
        path,
        config,
        Component,
        selectedComponent,
        selectComponent = noop
    } = props;

    const renderConfig = getDataComponentRenderConfig(type);
    const baseClassNames = !renderConfig?.ignoreBaseClassNames ? "component card" : "";

    return (
        <div
            className={`${baseClassNames} ${renderConfig?.baseClassNames} ${selectedComponent === path ? "selection-indicator" : ""}`}
            onClick={() => selectComponent(path)}
        >
            <div className="component-body card-body">
                <Component path={path} config={config}/>
            </div>
        </div>
    );
}

export default BaseComponent;