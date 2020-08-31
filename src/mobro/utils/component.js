import React from "react";
import {registerPublicEndpoint} from "mobro/utils/public";
import {getComponent} from "mobro/hooks/components-hooks";

/**
 * @param {[]} components
 * @param {function} render
 * @returns {null|[]}
 */
export function renderComponents(components, render) {
    if (!Array.isArray(components) || !components.length) {
        return null;
    }

    return components.map((component, i) => {
        const Component = getComponent(component.type);

        if (!Component) {
            return null;
        }

        return render(Component, component.config, i);
    });
}

/**
 * @param {{}} config
 * @returns {{}}
 */
export function extractGridConfig(config) {
    return {
        x: config.x || 0,
        y: config.y || 0,
        w: config.w || 12,
        h: config.h || 2
    }
}

/**
 * @param {{}} config
 * @param {{}} additionalStyles
 * @param {{}} defaults
 * @returns {{}}
 */
export function extractSize(config, additionalStyles = {}, defaults = {}) {
    return {
        ...defaults,
        width: toPixel(extractWidth(config)),
        height: toPixel(extractHeight(config)),
        ...additionalStyles
    };
}

registerPublicEndpoint("utils.component.extractSize", extractSize);

/**
 * @param {{}} config
 * @returns {number|null}
 */
export function extractHeight(config) {
    return config ? config.height : null;
}

registerPublicEndpoint("utils.component.extractHeight", extractHeight);

/**
 * @param {{}} config
 * @returns {number|null}
 */
export function extractWidth(config) {
    return config ? config.width : null;
}

registerPublicEndpoint("utils.component.extractWidth", extractWidth);

/**
 * @param {number} value
 * @returns {string|null}
 */
export function toPixel(value) {
    return value ? `${value}px` : null;
}

registerPublicEndpoint("utils.component.toPixel", toPixel);