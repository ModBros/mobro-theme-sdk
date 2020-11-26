import React from "react";
import FormGroup from "mobro/containers/edit/form/FormGroup";
import SourceSelect from "mobro/containers/edit/data/channel/SourceSelect";
import HardwareSelect from "mobro/containers/edit/data/channel/HardwareSelect";
import SensorSelect from "mobro/components/edit/data/channel/SensorSelect";
import {withFetchingIndicator} from "mobro/utils/component/fetching";
import MobroIcon from "mobro/containers/shared/MobroIcon";
import {getValueIcon} from "mobro/utils/component/select";
import {noop} from "mobro/utils/helper";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function ValuePreview(props) {
    const {
        value,
        reset = noop
    } = props;

    return (
        <span className={"mr-1 text-white clickable"} onClick={reset}>
            <MobroIcon icon={getValueIcon(value)}/> <FontAwesomeIcon icon={"chevron-right"}/>
        </span>
    );
}

function FillingSelect(props) {
    const {
        children
    } = props;

    return (
        <div className={"flex-fill"}>
            {children}
        </div>
    );
}

function Channel({data, name, sensorDataFetchingState, fetchSensorData, sources, hardwareTypes, sensors, onChange}) {
    const fetching = withFetchingIndicator(fetchSensorData, sensorDataFetchingState);

    if (fetching) {
        return fetching;
    }

    const changeSource = (value) => onChange({
        source: value?.value,
        hardwaretype: null,
        id: null
    });

    const changeHardware = (value) => onChange({
        source: data?.source,
        hardwaretype: value?.value,
        id: null
    });

    const changeSensor = (value) => onChange({
        source: data?.source,
        hardwaretype: data?.hardwaretype,
        id: value?.value
    });

    const children = [];

    if (!data?.source) {
        children.push((
            <FillingSelect>
                <SourceSelect
                    key="source"
                    sources={sources}
                    value={data?.source}
                    onChange={changeSource}
                />
            </FillingSelect>
        ));
    }

    if (data?.source && !data?.hardwaretype) {
        children.push((
            <ValuePreview value={data?.source} reset={changeSource}/>
        ))

        children.push((
            <FillingSelect>
                <HardwareSelect
                    key="hardware"
                    className="mt-1"
                    hardwareTypes={hardwareTypes}
                    value={data?.hardwaretype}
                    onChange={changeHardware}
                />
            </FillingSelect>
        ));
    }

    if (data?.hardwaretype) {
        children.push((
            <ValuePreview value={data?.source} reset={changeSource}/>
        ))

        children.push((
            <ValuePreview value={data?.hardwaretype} reset={changeHardware}/>
        ))

        children.push((
            <FillingSelect>
                <SensorSelect
                    key="sensor"
                    className="mt-1"
                    sensors={sensors}
                    value={data?.id}
                    onChange={changeSensor}
                />
            </FillingSelect>
        ));
    }

    return (
        <FormGroup label={name}>
            <div className={"d-flex align-items-center"}>
                {children}
            </div>
        </FormGroup>
    );
}

export default Channel;