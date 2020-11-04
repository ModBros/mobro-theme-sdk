import React from "react";
import TriggerEditButton from "mobro/containers/edit/TriggerEditButton";
import {noop} from "mobro/utils/helper";
import {getDataComponentRenderConfig} from "mobro/hooks/components-hooks";

function BaseComponent(props) {
    const {
        type,
        path,
        config,
        Component,
        pasteComponent = noop
    } = props;

    const renderConfig = getDataComponentRenderConfig(type);
    const baseClassNames = !renderConfig?.ignoreBaseClassNames ? "component card" : "";

    return (
        <div className={`${baseClassNames} ${renderConfig?.baseClassNames}`}>
            <TriggerEditButton type={type} path={path} config={config}/>

            <div className="component-body card-body">
                <Component path={path} config={config}/>
            </div>
        </div>
    );
}

export default BaseComponent;