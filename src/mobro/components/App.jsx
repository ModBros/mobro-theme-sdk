import React from "react";
import {failed, fetched, notAskedYet} from "mobro/utils/communication";
import LoadingIndicator from "mobro/containers/shared/LoadingIndicator";
import AlignCenter from "mobro/containers/shared/layout/AlignCenter";
import {getComponent} from "mobro/hooks/components-hooks";
import PositionableComponent from "mobro/containers/component/PositionableComponent";
import BaseComponent from "mobro/containers/component/BaseComponent";
import {renderComponents} from "mobro/utils/component";

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
        <div className="d-flex w-100 position-relative">
            {renderComponents(layout.components)}
        </div>
    )
}

export default App;