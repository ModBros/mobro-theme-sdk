import React, {useEffect, Fragment} from "react";
import {failed, fetched, notAskedYet} from "mobro/utils/communication";
import LoadingIndicator from "mobro/containers/shared/LoadingIndicator";
import AlignCenter from "mobro/containers/shared/layout/AlignCenter";
import {extractSize} from "mobro/utils/component";
import Entry from "mobro/containers/Entry";
import SidebarContainer from "mobro/containers/edit/SidebarContainer";
import {getPublicUploadUrl, hasEditmodeParam} from "mobro/utils/socket";
import {LAYOUT_MODE_DISPLAY, LAYOUT_MODE_EDIT} from "mobro/enum/layout";
import {isEditMode} from "mobro/utils/layout";
import Editmode from "mobro/containers/edit/Editmode";

function App(props) {
    const {
        layoutFetchingState,
        fetchLayout,
        setLayoutMode,
        config,
        layoutMode,
        editmode
    } = props;

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

    let appStyle = extractSize(config);
    const background = config?.background?.url;

    if (isEditMode(layoutMode)) {
        appStyle = {
            maxWidth: appStyle.width,
            maxHeight: appStyle.height
        }
    }

    if (background) {
        appStyle.backgroundImage = `url(${getPublicUploadUrl(background)})`;
    }

    let editmodeStyles = {};

    if (editmode && editmode.headerHeight && editmode.sidebarWidth) {
        editmodeStyles = {
            marginTop: editmode.headerHeight,
            maxWidth: window.innerWidth - editmode.sidebarWidth
        };
    }

    let content = (
        <div className={"d-flex w-100 align-items-center justify-content-center"} style={editmodeStyles}>
            <div className="app" style={appStyle}>
                <Entry/>
            </div>
        </div>
    );

    if (isEditMode(layoutMode)) {
        content = (
            <Fragment>
                <Editmode/>

                {content}
            </Fragment>
        );
    }

    return content
}

export default App;