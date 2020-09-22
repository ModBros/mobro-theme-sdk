import {createPublicHook} from "mobro/utils/hooks";
import {addObjectPropertyByPath} from "mobro/utils/object";
import {registerPublicEndpoint} from "mobro/utils/public";

const _components = {};
const _dataComponents = {};
const _dataComponentConfigs = {};

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
 */
export function addDataComponent(name, Component, config = {}) {
    addObjectPropertyByPath(_dataComponents, name, Component);
    addObjectPropertyByPath(_dataComponentConfigs, name, config);
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
 * @param name
 * @returns {*}
 */
export function getDataComponentConfig(name) {
    return _dataComponentConfigs[name];
}

registerPublicEndpoint("hooks.getDataComponentConfig", getDataComponentConfig);