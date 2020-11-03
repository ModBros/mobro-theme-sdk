import React from "react";
import {getDataComponentConfig, getEditComponent} from "mobro/hooks/components-hooks";
import {map} from "mobro/utils/helper";

function Edit({type, fields = null, path, config, layoutEdit}) {
    if (!fields) {
        fields = getDataComponentConfig(type);
    }

    return map(fields, (fieldConfig, name) => {
        const EditComponent = getEditComponent(fieldConfig.type);

        if (!EditComponent) {
            return null;
        }

        return (
            <EditComponent
                key={name}
                name={name}
                path={path}
                config={fieldConfig}
                data={config?.[name] ? config[name] : null}
                onChange={(data) => layoutEdit({path, name, data})}
            />
        );
    });
}

export default Edit;