import React from "react";
import {extractPosition} from "mobro/utils/component";

function PositionableComponent({config, className = "", children, ...props}) {
    return (
        <div className={`position-absolute ${className}`} style={extractPosition(config)} {...props}>
            {children}
        </div>
    );
}

export default PositionableComponent;