import React, {useEffect} from "react";
import {Responsive, WidthProvider} from "react-grid-layout";
import {extractGridConfig, extractLayoutFromGrid, isEditMode} from "mobro/utils/layout";
import BaseComponent from "mobro/containers/widget/BaseComponent";
import {getComponentConfig, renderComponents} from "mobro/utils/component";
import {map} from "mobro/utils/helper";

const ResponsiveGridLayout = WidthProvider(Responsive);

function Grid(props) {
    const {
        layoutMode,
        layoutChange,
        rowHeight,
        width,
        height,
        components
    } = props;

    useEffect(() => {
        // force resize for the responsive grid, if either width or height changes
        window.dispatchEvent(new Event("resize"));
    }, [width, height]);

    const layout = map(components, (component, i) => ({
        ...extractGridConfig(getComponentConfig(component)),
        i: i.toString()
    }));

    return (
        <div className={`grid ${isEditMode(layoutMode) ? "grid--editmode" : ""}`}>
            <ResponsiveGridLayout
                className="layout"
                width={width}
                cols={{lg: 24, md: 24, sm: 24, xs: 24, xxs: 24}}
                rowHeight={parseInt(rowHeight)}
                margin={[4, 4]}
                isDraggable={isEditMode(layoutMode)}
                isResizable={isEditMode(layoutMode)}
                layouts={{lg: layout}}
                onLayoutChange={(layout) => {
                    if (isEditMode(layoutMode)) {
                        layoutChange(extractLayoutFromGrid(layout));
                    }
                }}
            >
                {renderComponents(components, "", ({Component, type, path, config, i}) => (
                    <div key={i.toString()}>
                        <BaseComponent type={type} path={path} config={config} Component={Component}/>
                    </div>
                ))}
            </ResponsiveGridLayout>
        </div>
    );
}

export default Grid;