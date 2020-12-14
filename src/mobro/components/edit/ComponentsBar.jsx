import React, {Fragment} from "react";
import {empty, map, noop} from "mobro/utils/helper";
import TriggerEditButton from "mobro/containers/edit/TriggerEditButton";
import {getComponentConfig, getComponentPath, getComponentType} from "mobro/utils/component";
import AlignCenter from "mobro/containers/shared/layout/AlignCenter";
import IconButton from "mobro/components/edit/button/IconButton";
import Dropdown from "react-bootstrap/Dropdown";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {getComponentIcon, getComponentLabel, getDataComponentInformation} from "mobro/hooks/components-hooks";
import {hasIcon} from "mobro/utils/icons";
import MobroIcon from "mobro/containers/shared/MobroIcon";

function ComponentsBar(props) {
    const {
        path = "",
        components = [],
        selectedComponent,
        selectComponent = noop,
        removeComponent = noop,
        moveComponent = noop,
        duplicateComponent = noop
    } = props;

    if (empty(components)) {
        return (
            <AlignCenter>
                <h5 className={"text-white"}>No Components yet, add one!</h5>
            </AlignCenter>
        );
    }

    return (
        <Fragment>
            {map(components, (component, i) => {
                const componentPath = getComponentPath(path, i);

                return (
                    <div key={i} onClick={() => selectComponent(componentPath)} className={`${selectedComponent === componentPath ? "selection-indicator" : ""}`}>
                        <div className={"card mb-2 clickable components-bar__component"}>
                            <div className={"components-bar__up components-bar__control"}>
                                <IconButton
                                    icon={"chevron-up"}
                                    size={"sm"}
                                    className={"btn-inline"}
                                    onClick={() => {
                                        if (i === 0) {
                                            return false;
                                        }

                                        moveComponent(componentPath, getComponentPath(path, i - 1));
                                    }}
                                />
                            </div>

                            <div className={"card-body p-1"}>
                                <div className={"d-flex align-items-center"}>
                                    {getComponentIcon(getComponentType(component)) !== null && (
                                        <small>
                                            <MobroIcon icon={getComponentIcon(getComponentType(component))} className={"mr-2"}/>
                                        </small>
                                    )}

                                    <strong>
                                        {getComponentLabel(getComponentType(component))}
                                    </strong>

                                    <div className={"flex-fill d-flex justify-content-end align-items-center"}>
                                        <TriggerEditButton
                                            type={getComponentType(component)}
                                            path={componentPath}
                                            config={getComponentConfig(component)}
                                        />

                                        <IconButton
                                            icon={"trash"}
                                            variant={"link"}
                                            size={"sm"}
                                            title={"delete"}
                                            onClick={() => {
                                                removeComponent(componentPath)
                                            }}
                                        />

                                        <IconButton
                                            icon={"clone"}
                                            variant={"link"}
                                            size={"sm"}
                                            title={"duplicate"}
                                            onClick={() => {
                                                duplicateComponent(getComponentType(component), getComponentConfig(component));
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className={"components-bar__down components-bar__control"}>
                                <IconButton
                                    icon={"chevron-down"}
                                    size={"sm"}
                                    className={"btn-inline"}
                                    onClick={() => {
                                        if (i === components.length - 1) {
                                            return false;
                                        }

                                        moveComponent(componentPath, getComponentPath(path, i + 1));
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                );
            })}
        </Fragment>
    )
}

export default ComponentsBar;