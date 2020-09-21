import {createPublicHook} from "mobro/utils/hooks";
import {addObjectPropertyByPath} from "mobro/utils/object";
import {registerPublicEndpoint} from "mobro/utils/public";

export const withWrapper = createPublicHook("hooks.component", hooks => (componentId, WrappedComponent) => {
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

const components = {};
const configs = {};

/**
 * @param name
 * @param Component
 * @param config
 */
export function addComponent(name, Component, config = {}) {
    addObjectPropertyByPath(components, name, Component);
    addObjectPropertyByPath(configs, name, config);
}

registerPublicEndpoint("hooks.addComponent", addComponent);

/**
 * @param name
 * @returns {*}
 */
export function getComponent(name) {
    return components[name];
}

registerPublicEndpoint("hooks.getComponent", getComponent);

/**
 * @param name
 * @returns {*}
 */
export function getComponentConfig(name) {
    return configs[name];
}

registerPublicEndpoint("hooks.getComponentConfig", getComponentConfig);