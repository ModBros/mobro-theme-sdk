import React from "react";
import {getPublicUploadUrl} from "mobro/utils/socket";
import Entry from "mobro/containers/Entry";
import {isEditMode} from "mobro/utils/layout";

function AppContainer(props) {
    const {
        config,
        style,
        layoutMode,
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
        <div className={`${isEditMode(layoutMode) ? "scrollable scrollable--x scrollable--bigger" : ""} mw-100 mh-100`} style={style}>
            <div className="app" style={styles}>
                <Entry/>
            </div>
        </div>
    );
}

export default AppContainer;