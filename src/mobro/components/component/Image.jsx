import React from "react";

function Image({config}) {
    return (
        <div className="w-100 d-flex align-items-center">
            <img className="w-100" src={config.url}/>
        </div>
    );
}

export default Image;