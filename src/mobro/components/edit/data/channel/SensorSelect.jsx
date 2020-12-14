import React from "react";
import {extractRawUnit, extractValue} from "mobro/utils/channel-data";
import {getOptionByValue} from "mobro/utils/component/select";
import Select from "mobro/containers/shared/form/Select";
import {map} from "mobro/utils/helper";

function SensorSelect(props) {
    const {
        sensors,
        value,
        onChange,
        className = null,
        ...selectProps
    } = props;

    const groups = {};
    sensors.forEach((sensor) => {
        const option = {
            value: sensor.hardwareid + sensor.id,
            label: (
                <div className="d-flex justify-content-between align-items-center">
                    <span>{sensor.label}</span>
                    <small className="text-muted ml-3">{extractValue(sensor)}{extractRawUnit(sensor)}</small>
                </div>
            )
        };

        if (!groups[sensor.hardwareid + sensor.sensortype]) {
            groups[sensor.hardwareid + sensor.sensortype] = {
                label: `${sensor.hardwarename} ${sensor.sensortype}`,
                options: []
            }
        }

        groups[sensor.hardwareid + sensor.sensortype].options.push(option);
    });

    const options = map(groups, (group) => ({
        label: group.label,
        options: group.options
    }));

    return (
        <Select
            {...selectProps}
            placeholder={"select sensor value"}
            className={className}
            options={options}
            value={getOptionByValue(options, value)}
            onChange={value => onChange(value)}
        />
    );
}

export default SensorSelect;