import React from "react";
import {useBasicChannelListener} from "mobro/utils/component";
import {extractLabel, extractRawUnit, extractValue} from "mobro/utils/channel-data";
import dotPropImmutable from "dot-prop-immutable";
import LoadingIndicator from "mobro/containers/shared/LoadingIndicator";
import AlignCenter from "mobro/containers/shared/layout/AlignCenter";

function BasicValue(props) {
    const {
        config
    } = props;

    const channelData = useBasicChannelListener(config?.channel);

    if (!channelData) {
        return (<AlignCenter><LoadingIndicator className="small"/></AlignCenter>);
    }

    return (
        <div className="basic-value d-flex align-items-center justify-content-between">
            <span>
                {dotPropImmutable.get(config, "showLabel") ? extractLabel(channelData) : ""}
            </span>

            <strong>
                {extractValue(channelData)}{extractRawUnit(channelData)}
            </strong>
        </div>
    );
}

export default BasicValue;