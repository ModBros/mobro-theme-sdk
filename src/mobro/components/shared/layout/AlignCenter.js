import React from "react";

export default function ({children, ...props}) {
    return (
        <div className="d-flex w-100 align-items-center justify-content-center" {...props}>
            {children}
        </div>
    )
}