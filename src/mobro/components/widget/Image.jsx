import React from "react";
import {withPublicUrl} from "mobro/utils/http";

function Image(props) {
    const {
        config
    } = props;

    const url = withPublicUrl(config.image?.url);

    return (
        <div className="d-flex align-items-center negate-component-padding">
            <img className="w-100" src={url}/>
        </div>
    );
}

export default Image;