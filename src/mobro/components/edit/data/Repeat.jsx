import {Fragment} from "react";
import FormGroup from "mobro/containers/edit/form/FormGroup";
import IconButton from "mobro/containers/edit/button/IconButton";
import {empty, map} from "mobro/utils/helper";
import {getEditComponent, renderEdit} from "mobro/hooks/components-hooks";
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

    const dataWithFallback = data || [];

    return (
        <FormGroup label={name}>
            <Fragment>
                {map(dataWithFallback, (item, i) => {
                    return (
                        <div key={i} className={"border p-2 mb-2"}>
                            {renderEdit({
                                fields:
                                config.fields,
                                path,
                                config: item,
                                onChange: (fieldName, value) => {
                                    // set new value on this item (reference)
                                    item[fieldName] = value;

                                    onChange(dataWithFallback);
                                }
                            })}

                            <IconButton icon={"trash"} className={"w-100 mt-2"} size={"sm"} onClick={() => {
                                dataWithFallback.splice(i, 1);
                                onChange(dataWithFallback);
                            }}>
                                Remove Item
                            </IconButton>
                        </div>
                    );
                })}
            </Fragment>

            <IconButton icon={"plus"} className={"w-100"} size={"sm"} onClick={() => {
                const defaultValues = getEditDefaultValues(config.fields);
                onChange([...dataWithFallback, defaultValues]);
            }}>
                Add Item
            </IconButton>
        </FormGroup>
    );
}

export default Repeat;