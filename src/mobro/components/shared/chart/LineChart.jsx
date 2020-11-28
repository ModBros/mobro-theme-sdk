import {ResponsiveContainer, LineChart as ReLineChart, Line, YAxis} from "recharts";

function LineChart(props) {
    const {
        data,
        lineProps = {},
        dataKey = "value",
        unit = ""
    } = props;

    return (
        <div className={"chart-container"}>
            <ResponsiveContainer>
                <ReLineChart data={data}>
                    <Line
                        dot={false}
                        isAnimationActive={false}
                        strokeWidth={2} {...lineProps}
                        dataKey={dataKey}
                    />
                    <YAxis
                        dataKey={dataKey}
                        width={35}
                        axisLine={false}
                        tickLine={false}
                        tickSize={5}
                        unit={unit}
                        tick={{fontSize: 12}}
                        allowDecimals={false}
                    />
                </ReLineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default LineChart;