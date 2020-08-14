import React from "react";

function BaseComponent({children}) {
    return (
        <div className="component">
            {children}
        </div>
    );
}

export default BaseComponent;