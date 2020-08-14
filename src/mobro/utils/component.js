import React from "react";
import {getComponent} from "mobro/hooks/components-hooks";
import BaseComponent from "mobro/containers/component/BaseComponent";
import PositionableComponent from "mobro/containers/component/PositionableComponent";

export function renderComponents(components = []) {
    if (!Array.isArray(components) || !components.length) {
        return null;
    }

    return components.map((component, i) => {
        const Component = getComponent(component.type);

        if (!Component) {
            return null;
        }

        return (
            <PositionableComponent key={i} config={component.config}>
                <BaseComponent config={component.config}>
                    <Component key={i} config={component.config}/>
                </BaseComponent>
            </PositionableComponent>
        );
    });
}

export function extractPosition(config, additionalStyles = {}) {
    return {
        top: config.y ? config.y + "px" : null,
        left: config.x ? config.x + "px" : null,
        ...additionalStyles
    };
}

export function extractSize(config, additionalStyles = {}) {
    return {
        width: config.width ? config.width + "px" : null,
        height: config.height ? config.height + "px" : null,
        ...additionalStyles
    };
}