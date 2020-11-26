import Select from "react-select";
import React from "react";
import {applyValueIconToOptions, getOptionByValue, valuesToSelectOptions} from "mobro/utils/component/select";
import IconOption from "mobro/containers/edit/form/IconOption";

function SourceSelect({sources, value, onChange, className = null}) {
    const options = valuesToSelectOptions(sources);

    return (
        <Select
            className={className}
            options={applyValueIconToOptions(options)}
            components={{Option: IconOption}}
            value={getOptionByValue(options, value)}
            onChange={value => onChange(value)}
        />
    );
}

export default SourceSelect;