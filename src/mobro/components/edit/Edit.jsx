import React from "react";
import {getDataComponentConfig, getEditComponent, renderEdit} from "mobro/hooks/components-hooks";
import {map} from "mobro/utils/helper";

function Edit({type, fields = null, path, config, layoutEdit}) {
    if (!fields) {
        fields = getDataComponentConfig(type);
    }

    return renderEdit({
        fields,
        path,
        config,
        onChange: (name, data) => layoutEdit({path, name, data})
    });
}

export default Edit;