import {appendToObjectProperty} from "mobro/utils/object";
import {registerPublicEndpoint} from "mobro/utils/public";

function withConnectHook(hooks, ignoreDefault = false) {
    return (hookName, hook) => {
        return (...args) => {
            let actions = hooks[hookName];
            let wrapped = hook(...args);

            if (Array.isArray(actions)) {
                if (ignoreDefault) {
                    wrapped = {};
                }

                actions.forEach(action => {
                    wrapped = {...wrapped, ...action(...args)};
                });
            }

            return wrapped;
        }
    }
}

/**
 * No Operation Object Hook
 *
 * @returns {{}}
 */
export const nooohook = () => ({});

/**
 * No Operation Object Merge Hook
 *
 * @returns {{}}
 */
export const omhook = (...args) => {
    let value = {};

    if (args && args.length) {
        args.forEach(arg => {
            value = {...value, ...arg}
        });
    }

    return value;
}

/*
 * -----------------------------------------------------
 * Component Hooks
 * -----------------------------------------------------
 */

const wrapComponentHooks = {};

export function withWrapperHook(component, WrappedComponent) {
    return (props) => {
        let actions = wrapComponentHooks[component];
        let Component = WrappedComponent

        if (actions) {
            actions.forEach(action => {
                Component = action(Component);
            });
        }

        console.log(props);

        return (<Component {...props}/>)
    }
}

export function wrapComponent(component, render) {
    appendToObjectProperty(wrapComponentHooks, component, render);
}

registerPublicEndpoint("hooks.wrapComponent", wrapComponent);

/*
 * -----------------------------------------------------
 * Redux Hooks
 * -----------------------------------------------------
 */

// -----------------------------------------------------
// Map State To Props

const mapStateToPropsHooks = {};

export const withMapStateToPropsHook = withConnectHook(mapStateToPropsHooks);

export function wrapMapStateToProps(component, mapStateToProps) {
    appendToObjectProperty(mapStateToPropsHooks, component, mapStateToProps);
}

registerPublicEndpoint("hooks.wrapMapStateToProps", wrapMapStateToProps);

// -----------------------------------------------------
// Map Dispatch To Props

const mapDispatchToPropsHooks = {};
export const withMapDispatchToPropsHook = withConnectHook(mapDispatchToPropsHooks);

export function wrapMapDispatchToProps(component, mapDispatchToProps) {
    appendToObjectProperty(mapDispatchToPropsHooks, component, mapDispatchToProps);
}

registerPublicEndpoint("hooks.wrapDispatchStateToProps", wrapMapDispatchToProps);

// -----------------------------------------------------
// Merge Props

const mergePropsHooks = {};
export const withMergePropsHook = withConnectHook(mergePropsHooks);

export function wrapMergeProps(component, mergeProps) {
    appendToObjectProperty(mergePropsHooks, component, mergeProps);
}

registerPublicEndpoint("hooks.wrapDispatchStateToProps", wrapMergeProps);



