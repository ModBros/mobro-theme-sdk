import React from "react";
import {useHistoryChannelListener} from "mobro/utils/component";
import {empty, first} from "mobro/utils/helper";
import AlignCenter from "mobro/containers/shared/layout/AlignCenter";
import LoadingIndicator from "mobro/containers/shared/LoadingIndicator";
import {mapChannelDataToSingleChartData} from "mobro/utils/chart";
import LineChart from "mobro/containers/shared/chart/LineChart";
import {extractLabel, extractRawUnit} from "mobro/utils/channel-data";
import ComponentLabel from "mobro/containers/shared/ComponentLabel";

function getLabel(config, historyData) {
    if (!config?.showLabel) {
        return null;
    }

    if (config?.customLabel) {
        return config.customLabel;
    }

    if (empty(historyData)) {
        return null;
    }

    return extractLabel(first(historyData));
}

function BasicChart(props) {
    const {
        config
    } = props;

    if (!config?.displayType) {
        return (
            <AlignCenter>
                <div className={"alert alert-danger"}>
                    Select display type
                </div>
            </AlignCenter>
        )
    }

    const historyData = useHistoryChannelListener(config?.channel, 20);
    const chartData = mapChannelDataToSingleChartData(historyData);

    if (empty(chartData) || chartData.length < 3) {
        return (<AlignCenter><LoadingIndicator className={"small"}/></AlignCenter>)
    }

    const label = getLabel(config, historyData);
    const unit = extractRawUnit(first(historyData));

    return (
        <div className={"w-100 d-flex flex-column"}>
            <ComponentLabel label={label}/>

            <div className={"flex-fill d-flex"}>
                <LineChart
                    data={chartData}
                    unit={unit}
                />
            </div>
        </div>
    );
}

export default BasicChart;