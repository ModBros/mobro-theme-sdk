import React from "react";
import {Responsive, WidthProvider} from "react-grid-layout";
import {extractLayoutFromGrid, isEditMode, LAYOUT_MODE_EDIT} from "mobro/utils/layout";
import BaseComponent from "mobro/containers/component/BaseComponent";
import {extractGridConfig, renderComponents} from "mobro/utils/component";

const ResponsiveGridLayout = WidthProvider(Responsive);

function Grid({layoutMode, layoutChange, height, components}) {
    if (!Array.isArray(components) || !components.length) {
        return null;
    }

    return (
        <div className={`grid ${layoutMode === LAYOUT_MODE_EDIT ? "grid--editmode" : ""}`}>
            <ResponsiveGridLayout
                className="layout"
                cols={{lg: 12, md: 12, sm: 12, xs: 12, xxs: 12}}
                rowHeight={height ? height / 100 : 30}
                isDraggable={isEditMode(layoutMode)}
                isResizable={isEditMode(layoutMode)}
                onLayoutChange={(layout) => {
                    if (isEditMode(layoutMode)) {
                        layoutChange(extractLayoutFromGrid(layout));
                    }
                }}
            >
                {renderComponents(components, (Component, config, i) => (
                    <div key={i} data-grid={extractGridConfig(config)}>
                        <BaseComponent config={config} Component={Component}/>
                    </div>
                ))}
            </ResponsiveGridLayout>
        </div>
    );
}

export default Grid;