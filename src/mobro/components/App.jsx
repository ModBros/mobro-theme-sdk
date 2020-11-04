import React, {useEffect} from "react";
import {failed, fetched, notAskedYet} from "mobro/utils/communication";
import LoadingIndicator from "mobro/containers/shared/LoadingIndicator";
import AlignCenter from "mobro/containers/shared/layout/AlignCenter";
import {extractSize} from "mobro/utils/component";
import Entry from "mobro/containers/Entry";
import SidebarContainer from "mobro/containers/shared/SidebarContainer";
import {getPublicUploadUrl, hasEditmodeParam} from "mobro/utils/socket";
import {LAYOUT_MODE_DISPLAY, LAYOUT_MODE_EDIT} from "mobro/enum/layout";

function App({layoutFetchingState, fetchLayout, setLayoutMode, config}) {
    useEffect(() => {
        setLayoutMode(hasEditmodeParam() ? LAYOUT_MODE_EDIT : LAYOUT_MODE_DISPLAY);
    }, []);

    if (notAskedYet(layoutFetchingState)) {
        fetchLayout();
    }

    if (failed(layoutFetchingState)) {
        return (
            <AlignCenter>
                <div className="alert alert-danger">
                    Oh boy, something went wrong while fetching the layout definintion :/
                </div>
            </AlignCenter>
        )
    }

    if (!fetched(layoutFetchingState)) {
        return (
            <AlignCenter>
                <LoadingIndicator/>
            </AlignCenter>
        );
    }

    const style = extractSize(config);
    const background = config?.background?.url;

    if(background) {
        style.backgroundImage = `url(${getPublicUploadUrl(background)})`;
    }

    return (
        <div className="app" style={style}>
            <Entry/>

            <SidebarContainer/>
        </div>
    )
}

export default App;