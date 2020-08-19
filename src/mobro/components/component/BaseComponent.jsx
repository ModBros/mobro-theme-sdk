import React from "react";
import {extractSize} from "mobro/utils/component";

function BaseComponent({config, children}) {
    return (
        <div className="component" style={extractSize(config)}>
            {children}
        </div>
    );
}

export default BaseComponent;