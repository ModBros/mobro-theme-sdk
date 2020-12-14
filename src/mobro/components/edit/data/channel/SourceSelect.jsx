import React from "react";
import {applyValueIconToOptions, getOptionByValue, valuesToSelectOptions} from "mobro/utils/component/select";
import IconOption from "mobro/containers/edit/form/IconOption";
import Select from "mobro/containers/shared/form/Select";

function SourceSelect(props) {
    const {
        sources,
        value,
        onChange,
        className = null,
        ...selectProps
    } = props;

    const options = valuesToSelectOptions(sources);

    return (
        <Select
            {...selectProps}
            placeholder={"select source"}
            className={className}
            options={applyValueIconToOptions(options)}
            components={{Option: IconOption}}
            value={getOptionByValue(options, value)}

            onChange={value => onChange(value)}
        />
    );
}

export default SourceSelect;