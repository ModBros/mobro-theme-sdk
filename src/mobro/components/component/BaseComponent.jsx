import React from "react";

function BaseComponent({config, Component}) {
    // todo check if data component --> listen for changes

    return (
        <div className="component card">
            <div className="component-body card-body">
                <Component config={config}/>
            </div>
        </div>
    );
}

export default BaseComponent;