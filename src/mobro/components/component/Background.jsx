import React from "react";
import {renderComponents} from "mobro/utils/component";

function Background({config}) {
    console.log(config);
    return (
        <div className="background" style={{backgroundImage: `url(${config.url})`}}>
            {renderComponents(config.components)}
        </div>
    );
}

export default Background;