import React from "react";
import {getPublicUploadUrl} from "mobro/utils/socket";

function Image(props) {
    const {
        config
    } = props;

    return (
        <div className="d-flex align-items-center negate-component-padding">
            <img className="w-100" src={getPublicUploadUrl(config.image?.url)}/>
        </div>
    );
}

export default Image;