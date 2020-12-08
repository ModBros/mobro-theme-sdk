import React from "react";
import {getOptionByValue, valuesToSelectOptions} from "mobro/utils/component/select";
import Select from "mobro/containers/shared/form/Select";

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
            className={className}
            options={options}
            value={getOptionByValue(options, value)}
            onChange={value => onChange(value)}
        />
    );
}

export default HardwareSelect;