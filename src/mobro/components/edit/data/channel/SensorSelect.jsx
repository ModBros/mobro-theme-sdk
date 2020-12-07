import Select from "react-select";
import React from "react";
import {extractRawUnit, extractValue} from "mobro/utils/channel-data";
import {getOptionByValue} from "mobro/utils/component/select";

function SensorSelect(props) {
    const {
        sensors,
        value,
        onChange,
        className = null,
        ...selectProps
    } = props;

    const options = sensors.map((sensor) => ({
        value: sensor.hardwareid + sensor.id,
        label: (
            <div className="d-flex justify-content-between align-items-center">
                <span>{sensor.label}</span>
                <small className="text-muted ml-3">{extractValue(sensor)}{extractRawUnit(sensor)}</small>
            </div>
        )
    }));

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

export default SensorSelect;