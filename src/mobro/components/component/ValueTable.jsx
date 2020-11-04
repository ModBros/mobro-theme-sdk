import {empty, map} from "mobro/utils/helper";
import {useBasicChannelListener} from "mobro/utils/component";
import AlignCenter from "mobro/containers/shared/layout/AlignCenter";
import LoadingIndicator from "mobro/containers/shared/LoadingIndicator";
import {extractLabel, extractRawUnit, extractValue} from "mobro/utils/channel-data";

function ValueRow(props) {
    const {
        config
    } = props;

    const channelData = useBasicChannelListener(config?.channel);

    if (!channelData) {
        return (
            <tr>
                <td colSpan={2}>
                    <AlignCenter><LoadingIndicator className="small"/></AlignCenter>
                </td>
            </tr>
        );
    }

    return (
        <tr>
            <td>
                {extractLabel(channelData)}
            </td>

            <td className={"text-right"}>
                {extractValue(channelData)}{extractRawUnit(channelData)}
            </td>
        </tr>
    );
}

function ValueTable(props) {
    const {
        config
    } = props;

    const values = config?.values;

    if (empty(values)) {
        return null;
    }

    return (
        <table className={"table w-100"}>
            <tbody>
            {map(values, (value, i) => (
                <ValueRow key={i} config={value}/>
            ))}
            </tbody>
        </table>
    );
}

export default ValueTable;