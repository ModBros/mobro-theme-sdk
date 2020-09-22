import React from "react";
import {getDataComponentConfig} from "mobro/hooks/components-hooks";

function Edit({type, path, config}) {
    const componentConfig = getDataComponentConfig(type);

    console.log(type, path, config, componentConfig);

    return null;
}

export default Edit;