import React from "react";
import FormGroup from "mobro/containers/shared/form/FormGroup";
import SourceSelect from "mobro/containers/edit/data/channel/SourceSelect";
import HardwareSelect from "mobro/containers/edit/data/channel/HardwareSelect";
import SensorSelect from "mobro/components/edit/data/channel/SensorSelect";
import {withFetchingIndicator} from "mobro/utils/component/fetching";

function Channel({data, name, sensorDataFetchingState, fetchSensorData, sources, hardwareTypes, sensors, onChange}) {
    const fetching = withFetchingIndicator(fetchSensorData, sensorDataFetchingState);

    if (fetching) {
        return fetching;
    }

    const children = [(
        <SourceSelect
            key="source"
            sources={sources}
            value={data?.source}
            onChange={value => onChange({
                source: value.value,
                hardwaretype: data?.hardwaretype,
                id: null
            })}
        />
    )];

    if (data?.source) {
        children.push((
            <HardwareSelect
                key="hardware"
                className="mt-1"
                hardwareTypes={hardwareTypes}
                value={data?.hardwaretype}
                onChange={value => onChange({
                    source: data?.source,
                    hardwaretype: value.value,
                    id: null
                })}
            />
        ));
    }

    if (data?.hardwaretype) {
        children.push((
            <SensorSelect
                key="sensor"
                className="mt-1"
                sensors={sensors}
                value={data?.id}
                onChange={value => onChange({
                    source: data?.source,
                    hardwaretype: data?.hardwaretype,
                    id: value.value
                })}
            />
            ));
    }

    return (
        <div className="card">
            <div className="card-body p-2">
                <FormGroup label={name}>
                    {children}
                </FormGroup>
            </div>
        </div>
    );
}

export default Channel;