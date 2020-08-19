import React from "react";
import {failed, fetched, notAskedYet} from "mobro/utils/communication";
import LoadingIndicator from "mobro/containers/shared/LoadingIndicator";
import AlignCenter from "mobro/containers/shared/layout/AlignCenter";
import {extractSize, renderComponents} from "mobro/utils/component";

function App({layoutFetchingState, fetchLayout, layout}) {
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

    return (
        <div className="app d-flex position-relative" style={extractSize(layout, {}, {width: "100%"})}>
            {renderComponents(layout.components)}
        </div>
    )
}

export default App;