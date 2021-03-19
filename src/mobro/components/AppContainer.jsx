import React from "react";
import {getPublicUploadUrl} from "mobro/utils/socket";
import Entry from "mobro/containers/Entry";

function AppContainer(props) {
    const {
        config,
        style,
        zoomLevel
    } = props;

    let styles = {...style};
    const background = config?.background?.url;

    if (background) {
        styles = {
            ...styles,
            backgroundImage: `url(${getPublicUploadUrl(background)})`
        }
    }

    if(zoomLevel) {
        styles = {
            ...styles,
            zoom: zoomLevel
        }
    }

    return (
        <div className={"scrollable scrollable--x scrollable--bigger"}>
            <div className="app" style={styles}>
                <Entry/>
            </div>
        </div>
    );
}

export default AppContainer;