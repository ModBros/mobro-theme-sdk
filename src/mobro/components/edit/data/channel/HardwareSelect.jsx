import React from "react";
import {applyValueIconToOptions, getOptionByValue, valuesToSelectOptions} from "mobro/utils/component/select";
import Select from "mobro/containers/shared/form/Select";
import IconOption from "mobro/containers/edit/form/IconOption";

function HardwareSelect(props) {
    const {
        hardwareTypes,
        value,
        onChange,
        className = null,
        ...selectProps
    } = props;

    const options = valuesToSelectOptions(hardwareTypes);

    return (
        <Select
            {...selectProps}
            placeholder={"select hardware type"}
            className={className}
            options={applyValueIconToOptions(options)}
            components={{Option: IconOption}}
            value={getOptionByValue(options, value)}
            onChange={value => onChange(value)}
        />
    );
}

export default HardwareSelect;