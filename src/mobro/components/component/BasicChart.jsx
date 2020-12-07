import React, {Fragment, useState} from "react";
import {useHistoryChannelListener} from "mobro/utils/component";
import {empty, first, last} from "mobro/utils/helper";
import AlignCenter from "mobro/containers/shared/layout/AlignCenter";
import LoadingIndicator from "mobro/containers/shared/LoadingIndicator";
import {mapChannelDataToSingleChartData} from "mobro/utils/chart";
import {Label, Line, LineChart, PolarAngleAxis, RadialBar, RadialBarChart, Text, YAxis} from "recharts";
import {extractLabel, extractRawUnit, extractValue, isPercentageData} from "mobro/utils/channel-data";
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

function BasicLineChart(props) {
    const {
        width,
        height,
        unit,
        chartData,
        data
    } = props;

    return (
        <LineChart data={chartData} width={width} height={height}>
            <Line
                dot={false}
                isAnimationActive={false}
                strokeWidth={2}
                dataKey={"value"}
            />

            <YAxis
                dataKey={"value"}
                orientation={"right"}
                width={35}
                axisLine={false}
                tickLine={false}
                tickSize={5}
                unit={unit}
                tick={{fontSize: 12}}
                allowDecimals={false}
                interval={0}
                ticks={[data.min, data.max]}
            />
        </LineChart>
    );
}

function BasicPieChart(props) {
    const {
        width,
        height,
        chartData,
        data
    } = props;

    const value = {
        ...last(chartData)
    };

    if (isPercentageData(data)) {
        value.max = 100;
    } else {
        value.max = data.max;
    }

    return (
        <Fragment>
            <RadialBarChart
                innerRadius={"85%"}
                outerRadius={"100%"}
                data={[value]}
                startAngle={180}
                endAngle={0}
                cy={"50%"}
                width={width}
                height={height * 2}
            >
                <PolarAngleAxis
                    type={"number"}
                    domain={[0, 100]}
                    angleAxisId={0}
                    tick={false}
                />

                <RadialBar
                    minAngle={0}
                    clockWise={true}
                    dataKey={"value"}
                    denominator={"max"}
                    background
                    isAnimationActive={false}
                    cy={"100%"}
                />
            </RadialBarChart>

            <small className={"pie-chart-label"}>
                {extractValue(data)}{extractRawUnit(data)}
            </small>
        </Fragment>
    );
}

function BasicChart(props) {
    const {
        config
    } = props;

    const [container, setContainer] = useState(null);
    const historyData = useHistoryChannelListener(config?.channel, 20);
    const lastData = last(historyData);
    const chartData = mapChannelDataToSingleChartData(historyData);

    if (!config?.displayType) {
        return (<AlignCenter><LoadingIndicator className={"small"}/></AlignCenter>)
    }

    if (empty(chartData) || chartData.length < 3) {
        return (<AlignCenter><LoadingIndicator className={"small"}/></AlignCenter>)
    }

    const label = getLabel(config, historyData);
    const unit = extractRawUnit(first(historyData));
    let ChartComponent = null;

    switch (config.displayType) {
        case "line":
            ChartComponent = BasicLineChart;
            break;

        case "pie":
            ChartComponent = BasicPieChart;
            break;
    }

    let width = 0;
    let height = 0;

    if (container) {
        width = container.clientWidth;
        height = container.clientHeight;
    }

    return (
        <div className={"w-100 d-flex flex-column position-relative"}>
            <ComponentLabel label={label} className={"chart-label"}/>

            <div className={"flex-fill d-flex overflow-hidden"} ref={setContainer}>
                <div className={"chart-container"}>
                    <ChartComponent
                        width={width}
                        height={height}
                        unit={unit}
                        chartData={chartData}
                        data={lastData}
                    />
                </div>
            </div>
        </div>
    );
}

export default BasicChart;