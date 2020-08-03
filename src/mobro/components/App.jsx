import React from "react";
import {failed, fetched, notAskedYet} from "mobro/utils/communication";
import LoadingIndicator from "mobro/components/shared/LoadingIndicator";
import AlignCenter from "mobro/components/shared/layout/AlignCenter";
import {getComponent} from "mobro/hooks/components-hooks";

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
        <div>
            {layout.components.map((component, i) => {
                const Component = getComponent(component.type);

                if(!Component) {
                    return null;
                }

                return (<Component key={i} config={component.config}/>);
            })}
        </div>
    )
}

export default App;