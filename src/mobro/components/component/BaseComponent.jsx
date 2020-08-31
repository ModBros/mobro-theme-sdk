import React from "react";

function BaseComponent({config, Component}) {
    // todo check if data component --> listen for changes

    return (
        <div className="component">
            <Component config={config}/>
        </div>
    );
}

export default BaseComponent;