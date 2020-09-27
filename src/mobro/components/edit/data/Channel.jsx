import React, {Fragment, useState} from "react";
import {FETCHING} from "mobro/utils/communication";
import LoadingIndicator from "mobro/containers/shared/LoadingIndicator";
import AlignCenter from "mobro/containers/shared/layout/AlignCenter";
import FormGroup from "mobro/containers/shared/form/FormGroup";
import Select from "react-select";
import {extractRawUnit, extractValue} from "mobro/utils/channel-data";

/*
"name": "general_processor_usage",
"source": "openhardwaremonitor",
"hardwaretype": "Processor",
"id": "/intelcpu/0/intelcpu/0/load/0"
*/

function Channel({data, name, sensorDataFetchingState, sensorData = [], fetchSensorData, onChange}) {
    const [init, setInit] = useState(false);

    if (!init) {
        fetchSensorData();
        setInit(true);
    }

    if (sensorDataFetchingState === FETCHING) {
        return (<AlignCenter><LoadingIndicator className="small"/></AlignCenter>);
    }

    const options = sensorData.map((sensor) => ({
        value: sensor.hardwareid + sensor.id,
        label: (<div className="d-flex justify-content-between align-items-center"><span>{sensor.label}</span> <small className="text-muted ml-3">{extractValue(sensor)}{extractRawUnit(sensor)}</small></div>)
    }));

    return (
        <div className="card">
            <div className="card-body">
                <FormGroup label={name}>
                    <Select options={options} value={options.find(value => value.value === data.id)} onChange={(value) => onChange({...data, id: value.value})}/>
                </FormGroup>
            </div>
        </div>
    );
}

export default Channel;