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

export function addComponent(name, Component) {
    addObjectPropertyByPath(components, name, Component);
}

export function getComponent(name) {
    return components[name];
}

registerPublicEndpoint("hooks.addComponent", addComponent);