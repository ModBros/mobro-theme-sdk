import React from "react";
import {getPublicUploadUrl} from "mobro/utils/socket";
import Entry from "mobro/containers/Entry";

function AppContainer(props) {
    const {
        config,
        style
    } = props;

    let styles = {...style};
    const background = config?.background?.url;

    if (background) {
        styles = {
            ...styles,
            backgroundImage: `url(${getPublicUploadUrl(background)})`
        }
    }

    return (
        <div className="app" style={styles}>
            <Entry/>
        </div>
    );
}

export default AppContainer;