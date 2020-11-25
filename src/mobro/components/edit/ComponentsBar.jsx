import {Fragment} from "react";
import {empty, map, noop} from "mobro/utils/helper";
import TriggerEditButton from "mobro/containers/edit/TriggerEditButton";
import React from "react";
import {getComponentPath} from "mobro/utils/component";
import AlignCenter from "mobro/containers/shared/layout/AlignCenter";
import IconButton from "mobro/components/edit/button/IconButton";

function ComponentsBar(props) {
    const {
        path = "",
        components = [],
        selectedComponent,
        selectComponent = noop,
        removeComponent = noop
    } = props;

    if(empty(components)) {
        return (
            <AlignCenter>
                <h5 className={"text-white"}>No Components yet, add one!</h5>
            </AlignCenter>
        );
    }

    return (
        <div className={"px-2"}>
            <h5 className={"my-2 text-white"}>
                Your Components
            </h5>

            {map(components, (component, i) => {
                const componentPath = getComponentPath(path, i);

                return (
                    <div key={i} onClick={() => selectComponent(componentPath)} className={`${selectedComponent === componentPath ? "selection-indicator" : ""}`}>
                        <div className={"card mb-2"}>
                            <div className={"card-body p-1"}>
                                <div className={"d-flex align-items-center"}>
                                    <strong>
                                        {component.type}
                                    </strong>

                                    <div className={"flex-fill d-flex justify-content-end align-items-center"}>
                                        <IconButton
                                            icon={"trash"}
                                            variant={"link"}
                                            size={"sm"}
                                            onClick={() => {
                                                removeComponent(componentPath)
                                            }}
                                        />

                                        <TriggerEditButton type={component.type} path={componentPath} config={component.config}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default ComponentsBar;