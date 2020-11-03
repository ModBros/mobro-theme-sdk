import {createPublicHook} from "mobro/utils/hooks";
import {addObjectPropertyByPath} from "mobro/utils/object";
import {registerPublicEndpoint} from "mobro/utils/public";
import {getDataOrDefault, getEditDefaultValues} from "mobro/utils/component";

const _components = {};
const _dataComponents = {};
const _dataComponentConfigs = {};
const _dataComponentDefaultValues = {};
const _editComponents = {};
const _editComponentDefaultValues = {};

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
 * @param name
 * @param Component
 * @param config
 * @param defaultValue
 */
export function addDataComponent(name, Component, config = {}, defaultValue = {}) {
    const allDefaultValues = getEditDefaultValues(config, defaultValue);

    addObjectPropertyByPath(_dataComponents, name, Component);
    addObjectPropertyByPath(_dataComponentConfigs, name, config);
    addObjectPropertyByPath(_dataComponentDefaultValues, name, allDefaultValues);
}

registerPublicEndpoint("hooks.addDataComponent", addDataComponent);

/**
 * @param name
 * @returns {*}
 */
export function getDataComponent(name) {
    return _dataComponents[name];
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
    return _dataComponentConfigs[name];
}

registerPublicEndpoint("hooks.getDataComponentConfig", getDataComponentConfig);

/**
 * @param name
 * @returns {{}}
 */
export function getDataComponentDefaultValue(name) {
    return getDataOrDefault(_dataComponentDefaultValues[name], {});
}

registerPublicEndpoint("hooks.getDataComponentDefaultValue", getDataComponentDefaultValue);

/**
 * @param name
 * @param Component
 * @param defaultValue
 */
export function addEditComponent(name, Component, defaultValue = null) {
    addObjectPropertyByPath(_editComponents, name, Component);
    addObjectPropertyByPath(_editComponentDefaultValues, name, defaultValue);
}

registerPublicEndpoint("hooks.addEditComponent", addEditComponent);

/**
 * @param name
 * @returns {*}
 */
export function getEditComponentDefaultValue(name) {
    return _editComponentDefaultValues[name];
}

registerPublicEndpoint("hooks.getEditComponentDefaultValue", getEditComponentDefaultValue);

/**
 * @param name
 * @returns {*}
 */
export function getEditComponent(name) {
    return _editComponents[name];
}

registerPublicEndpoint("hooks.getEditComponent", getEditComponent);