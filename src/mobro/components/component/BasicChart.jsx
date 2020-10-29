import React from "react";
import {useHistoryChannelListener} from "mobro/utils/component";
import {empty} from "mobro/utils/helper";
import AlignCenter from "mobro/containers/shared/layout/AlignCenter";
import LoadingIndicator from "mobro/containers/shared/LoadingIndicator";
import {mapChannelDataToSingleChartData} from "mobro/utils/chart";
import LineChart from "mobro/containers/shared/chart/LineChart";

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

    return (
        <LineChart
            data={chartData}
        />
    );
}

export default BasicChart;