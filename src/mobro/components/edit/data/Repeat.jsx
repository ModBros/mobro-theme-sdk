import FormGroup from "mobro/containers/shared/form/FormGroup";
import IconButton from "mobro/containers/shared/button/IconButton";
import {empty, map} from "mobro/utils/helper";
import {getEditComponent} from "mobro/hooks/components-hooks";
import React from "react";
import {getEditDefaultValues} from "mobro/utils/component";

function Repeat(props) {
    const {
        name,
        config,
        data,
        onChange
    } = props;

    if (empty(config.fields)) {
        return null;
    }

    return (
        <FormGroup label={name}>
            {map(data, (item, i) => {
                return (
                    <div key={i}>
                        {map(config.fields, (fieldConfig, fieldName) => {
                            const EditComponent = getEditComponent(fieldConfig.type);

                            if (!EditComponent) {
                                return null;
                            }

                            return (
                                <EditComponent
                                    key={fieldName}
                                    name={fieldName}
                                    config={fieldConfig}
                                    data={item?.[fieldName] ? item?.[fieldName] : null}
                                    onChange={(value) => {
                                        // set new value on this item (reference)
                                        item[fieldName] = value;

                                        onChange(data);
                                    }}
                                />
                            );
                        })}
                    </div>
                );
            })}

            <IconButton icon={"plus"} className={"w-100"} onClick={() => {
                const defaultValues = getEditDefaultValues(config.fields);
                data.push(defaultValues);

                onChange(data);
            }}>
                Add Item
            </IconButton>
        </FormGroup>
    );
}

export default Repeat;