import React from "react";

function AlignCenter ({children, ...props}) {
    return (
        <div className="d-flex w-100 align-items-center justify-content-center" {...props}>
            {children}
        </div>
    )
}

export default AlignCenter;