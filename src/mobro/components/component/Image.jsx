import React from "react";

function Image({config}) {
    return (
        <img className="w-100" src={config.url}/>
    );
}

export default Image;