import {Fragment} from "react";
import {empty, map, noop} from "mobro/utils/helper";
import TriggerEditButton from "mobro/containers/edit/TriggerEditButton";
import React from "react";
import {getComponentPath} from "mobro/utils/component";
import AlignCenter from "mobro/containers/shared/layout/AlignCenter";
import IconButton from "mobro/components/shared/button/IconButton";

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
                <h5>No Components yet, add one!</h5>
            </AlignCenter>
        );
    }

    return (
        <div className={"px-2"}>
            {map(components, (component, i) => {
                const path = getComponentPath(path, i);

                return (
                    <div key={i} onClick={() => selectComponent(path)} className={`border-bottom ${selectedComponent === path ? "selection-indicator" : ""}`}>
                        <div className={"px-2 py-3 d-flex align-items-center"}>
                            <small className={"text-muted mr-3"}>
                                #{i}
                            </small>

                            <span className={"text-uppercase"}>
                                {component.type}
                            </span>

                            <div className={"flex-fill d-flex justify-content-end align-items-center"}>
                                <IconButton
                                    icon={"trash"}
                                    variant={"link"}
                                    size={"sm"}
                                    onClick={() => {
                                        removeComponent(path)
                                    }}
                                />

                                <TriggerEditButton type={component.type} path={path} config={component.config}/>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default ComponentsBar;