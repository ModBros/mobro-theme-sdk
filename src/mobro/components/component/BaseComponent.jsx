import React from "react";
import TriggerEditButton from "mobro/containers/edit/TriggerEditButton";

function BaseComponent({type, path, config, Component}) {
    return (
        <div className="component card">
            <TriggerEditButton type={type} path={path} config={config}/>

            <div className="component-body card-body">
                <Component path={path} config={config}/>
            </div>
        </div>
    );
}

export default BaseComponent;