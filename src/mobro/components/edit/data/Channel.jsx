import React from "react";
import FormGroup from "mobro/containers/edit/form/FormGroup";
import SourceSelect from "mobro/containers/edit/data/channel/SourceSelect";
import HardwareSelect from "mobro/containers/edit/data/channel/HardwareSelect";
import SensorSelect from "mobro/containers/edit/data/channel/SensorSelect";
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
        <span className={"mr-1 clickable d-flex align-items-center"} onClick={reset}>
            <MobroIcon
                icon={getValueIcon(value)}
            />

            <FontAwesomeIcon
                className={"text-muted ml-1"}
                icon={"chevron-right"}
                size={"xs"}
            />
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

function Channel(props) {
    const {
        data,
        name,
        sensorDataFetchingState,
        fetchSensorData,
        sources,
        hardwareTypes,
        sensors,
        onChange
    } = props;

    const fetching = withFetchingIndicator(fetchSensorData, sensorDataFetchingState);

    if (fetching) {
        return fetching;
    }

    const selectStyles = {
        control: (provided) => ({
            ...provided,
            border: "none"
        })
    };

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
            <FillingSelect key="source">
                <SourceSelect
                    styles={selectStyles}
                    sources={sources}
                    value={data?.source}
                    onChange={changeSource}
                />
            </FillingSelect>
        ));
    }

    if (data?.source && !data?.hardwaretype) {
        children.push((
            <ValuePreview key={"sourcevalue"} value={data?.source} reset={changeSource}/>
        ));

        children.push((
            <FillingSelect key="hardware">
                <HardwareSelect
                    styles={selectStyles}
                    hardwareTypes={hardwareTypes}
                    value={data?.hardwaretype}
                    onChange={changeHardware}
                />
            </FillingSelect>
        ));
    }

    if (data?.hardwaretype) {
        children.push((
            <ValuePreview key={"sourcevalue"} value={data?.source} reset={changeSource}/>
        ));

        children.push((
            <ValuePreview key={"hardwarevalue"} value={data?.hardwaretype} reset={changeHardware}/>
        ));

        children.push((
            <FillingSelect key="sensor">
                <SensorSelect
                    styles={selectStyles}
                    sensors={sensors}
                    value={data?.id}
                    onChange={changeSensor}
                />
            </FillingSelect>
        ));
    }

    return (
        <FormGroup label={name}>
            <div className={"card"}>
                <div className={"d-flex align-items-center py-0 px-1"}>
                    {children}
                </div>
            </div>
        </FormGroup>
    );
}

export default Channel;