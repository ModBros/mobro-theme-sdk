import Select from "react-select";
import React from "react";
import {getOptionByValue, valuesToSelectOptions} from "mobro/utils/component/select";

function SourceSelect({sources, value, onChange, className = null}) {
    const options = valuesToSelectOptions(sources);

    return (
        <Select
            className={className}
            options={options}
            value={getOptionByValue(options, value)}
            onChange={value => onChange(value)}
        />
    );
}

export default SourceSelect;