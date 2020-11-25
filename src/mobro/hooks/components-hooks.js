import {createPublicHook} from "mobro/utils/hooks";
import {addObjectPropertyByPath} from "mobro/utils/object";
import {registerPublicEndpoint} from "mobro/utils/public";
import {getDataOrDefault, getEditDefaultValues} from "mobro/utils/component";

const _components = {};
const _dataComponents = {};
const _editComponents = {};

export const withWrapper = createPublicHook("hooks.component", hooks => (componentId, WrappedComponent) => {
    addObjectPropertyByPath(_components, componentId, WrappedComponent);

    return props => {
        let HOCs = hooks[componentId];
        let Component = WrappedComponent

        if (HOCs) {
            HOCs.forEach(HOC => {
                Component = HOC(Component);
            });
        }

        return (<Component {...props}/>)
    }
});

/**
 * @param name
 * @returns {*}
 */
export function getComponent(name) {
    return _components[name];
}

registerPublicEndpoint("hooks.getComponent");

/**
 * @param {{}} args
 */
export function addDataComponent(args) {
    const {
        name,
        component,
        config = {},
        componentPaths = [],
        defaultValues = {},
        renderConfig = {}
    } = args;

    const defaultValue = getEditDefaultValues(config, defaultValues);

    addObjectPropertyByPath(_dataComponents, name, {
        component,
        config,
        componentPaths,
        defaultValue,
        renderConfig
    });
}

registerPublicEndpoint("hooks.addDataComponent", addDataComponent);

/**
 * @param name
 * @returns {*}
 */
export function getDataComponent(name) {
    return _dataComponents[name]?.component;
}

registerPublicEndpoint("hooks.getDataComponent", getDataComponent);

/**
 * @returns {{}}
 */
export function getDataComponents() {
    return _dataComponents;
}

registerPublicEndpoint("hooks.getDataComponents", getDataComponents);

/**
 * @param name
 * @returns {*}
 */
export function getDataComponentConfig(name) {
    return _dataComponents[name]?.config;
}

registerPublicEndpoint("hooks.getDataComponentConfig", getDataComponentConfig);

/**
 * @param name
 * @returns {{}}
 */
export function getDataComponentDefaultValue(name) {
    return getDataOrDefault(_dataComponents[name]?.defaultValue, {});
}

registerPublicEndpoint("hooks.getDataComponentDefaultValue", getDataComponentDefaultValue);

/**
 * @param name
 * @returns {{}}
 */
export function getDataComponentRenderConfig(name) {
    return getDataOrDefault(_dataComponents[name]?.renderConfig, {});
}

registerPublicEndpoint("hooks.getDataComponentRenderConfig", getDataComponentRenderConfig);

/**
 * @param {{}} args
 */
export function addEditComponent(args) {
    const {
        name,
        component,
        defaultValue = null
    } = args;

    addObjectPropertyByPath(_editComponents, name, {
        name,
        component,
        defaultValue
    });
}

registerPublicEndpoint("hooks.addEditComponent", addEditComponent);

/**
 * @param name
 * @returns {*}
 */
export function getEditComponentDefaultValue(name) {
    return _editComponents[name]?.defaultValue;
}

registerPublicEndpoint("hooks.getEditComponentDefaultValue", getEditComponentDefaultValue);

/**
 * @param name
 * @returns {*}
 */
export function getEditComponent(name) {
    return _editComponents[name]?.component;
}

registerPublicEndpoint("hooks.getEditComponent", getEditComponent);