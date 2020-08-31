import React from "react";
import {renderComponents} from "mobro/utils/component";
import Grid from "mobro/containers/grid/Grid";

function Background({config}) {
    return (
        <div className="background" style={{backgroundImage: `url(${config.url})`}}>
            <Grid components={config.components}/>
        </div>
    );
}

export default Background;