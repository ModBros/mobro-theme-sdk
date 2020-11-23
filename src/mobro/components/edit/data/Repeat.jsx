import {Fragment} from "react";
import FormGroup from "mobro/containers/edit/form/FormGroup";
import IconButton from "mobro/containers/edit/button/IconButton";
import {empty, map} from "mobro/utils/helper";
import {getEditComponent} from "mobro/hooks/components-hooks";
import React from "react";
import {getEditDefaultValues} from "mobro/utils/component";

function Repeat(props) {
    const {
        name,
        config,
        data,
        onChange,
        path
    } = props;

    if (empty(config.fields)) {
        return null;
    }

    return (
        <FormGroup label={name}>
            <Fragment>
                {map(data, (item, i) => {
                    return (
                        <div className={"draggable"} key={i}>
                            <div className={"card mb-3"}>
                                <div className={"card-body p-2"}>
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

                                    <IconButton icon={"trash"} className={"w-100"} size={"sm"} onClick={() => {
                                        data.splice(i, 1);
                                        onChange(data);
                                    }}>
                                        Remove Item
                                    </IconButton>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </Fragment>

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