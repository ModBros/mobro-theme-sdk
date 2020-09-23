import React from "react";
import {getDataComponentConfig, getEditComponent} from "mobro/hooks/components-hooks";

function Edit({type, path, config, layoutEdit}) {
    const componentConfig = getDataComponentConfig(type);
    const fields = Object.entries(componentConfig);

    if (!fields.length) {
        return (<h5>Nothing to configure</h5>);
    }

    return fields.map(([name, fieldConfig]) => {
        const EditComponent = getEditComponent(fieldConfig.type);

        if(!EditComponent) {
            return null;
        }

        return (
            <EditComponent
                key={name}
                name={name}
                path={path}
                config={fieldConfig}
                data={config[name] || null}
                onChange={(data) => layoutEdit(path, name, data)}
            />
        );
    });
}

export default Edit;