import React from "react";
import {Responsive, WidthProvider} from "react-grid-layout";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {extractGridConfig, extractLayoutFromGrid, isEditMode} from "mobro/utils/layout";
import BaseComponent from "mobro/containers/component/BaseComponent";
import {renderComponents} from "mobro/utils/component";
import AddComponentButton from "mobro/containers/edit/AddComponentButton";
import TriggerGlobalConfigButton from "mobro/containers/edit/TriggerGlobalConfigButton";

const ResponsiveGridLayout = WidthProvider(Responsive);

function Grid({layoutMode, layoutChange, rowHeight, components}) {
    return (
        <div className={`grid ${isEditMode(layoutMode) ? "grid--editmode" : ""}`}>
            <ResponsiveGridLayout
                className="layout"
                cols={{lg: 12, md: 12, sm: 12, xs: 12, xxs: 12}}
                rowHeight={parseInt(rowHeight)}
                margin={[4, 4]}
                isDraggable={isEditMode(layoutMode)}
                isResizable={isEditMode(layoutMode)}
                onLayoutChange={(layout) => {
                    if (isEditMode(layoutMode)) {
                        layoutChange(extractLayoutFromGrid(layout));
                    }
                }}
            >
                {renderComponents(components, "", (Component, type, path, config) => (
                    <div key={path} data-grid={extractGridConfig(config)}>
                        <BaseComponent type={type} path={path} config={config} Component={Component}/>
                    </div>
                ))}
            </ResponsiveGridLayout>

            {isEditMode(layoutMode) && (
                <div className="absolute-container">
                    <AddComponentButton/>
                    <span className={"pl-1"}/>
                    <TriggerGlobalConfigButton/>
                </div>
            )}
        </div>
    );
}

export default Grid;