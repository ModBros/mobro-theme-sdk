import Select from "react-select";
import React from "react";
import {extractRawUnit, extractValue} from "mobro/utils/channel-data";
import {getOptionByValue} from "mobro/utils/component/select";

function SensorSelect({sensors, value, onChange, className = null}) {
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
            className={className}
            options={options}
            value={getOptionByValue(options, value)}
            onChange={value => onChange(value)}
        />
    );
}

export default SensorSelect;