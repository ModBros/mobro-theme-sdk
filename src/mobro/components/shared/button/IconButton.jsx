import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Button from "mobro/containers/shared/button/Button";
import {empty} from "mobro/utils/helper";

function IconButton(props) {
    const {
        icon = null,
        children,
        ...buttonProps
    } = props;

    return (
        <Button {...buttonProps}>
            <FontAwesomeIcon icon={icon} className={!empty(children) ? "mr-2" : ""}/>

            {children}
        </Button>
    );
}

export default IconButton;