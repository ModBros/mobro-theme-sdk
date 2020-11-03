import React from "react";
import TriggerEditButton from "mobro/containers/edit/TriggerEditButton";
import {noop} from "mobro/utils/helper";

function BaseComponent(props) {
    const {
        type,
        path,
        config,
        Component,
        pasteComponent = noop
    } = props;

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