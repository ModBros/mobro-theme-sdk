import {appendToObjectProperty} from "mobro/utils/object";
import {registerPublicEndpoint} from "mobro/utils/public";

/*
 * -----------------------------------------------------
 * Render / Wrap Actions
 * -----------------------------------------------------
 */

// -----------------------------------------------------
// private

const renderActions = {};

export function withWrapperHook(action, WrappedComponent) {
    return (props) => {
        let actions = renderActions[action];
        let Component = WrappedComponent

        if (actions) {
            actions.forEach((action) => {
                Component = action(Component);
            });
        }

        return (<Component {...props}/>)
    }
}

// -----------------------------------------------------
// public

export function wrapComponent(component, render) {
    appendToObjectProperty(renderActions, component, render);
}

registerPublicEndpoint("hooks.wrapComponent", wrapComponent);