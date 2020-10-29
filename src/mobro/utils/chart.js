import {map} from "mobro/utils/helper";
import {extractRawValue} from "mobro/utils/channel-data";
import {registerPublicEndpoint} from "mobro/utils/public";

export function mapChannelDataToSingleChartData(channelData) {
    return map(channelData, (item, index) => ({
        name: index,
        value: extractRawValue(item)
    }));
}

registerPublicEndpoint("utils.chart.mapChannelDataToSingleChartData", mapChannelDataToSingleChartData);