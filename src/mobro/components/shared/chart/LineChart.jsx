import {ResponsiveContainer, LineChart as ReLineChart, Line} from "recharts";

function LineChart(props) {
    const {
        data,
        lineProps = {},
        dataKey = "value"
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
                </ReLineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default LineChart;