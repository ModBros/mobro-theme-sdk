import {createPublicHook} from "mobro/utils/hooks";
import {addObjectPropertyByPath, getObjectPropertyByPath} from "mobro/utils/object";
import {registerPublicEndpoint} from "mobro/utils/public";
import {getDataOrDefault, getEditDefaultValues} from "mobro/utils/component";
import {empty, map, noop} from "mobro/utils/helper";
import React from "react";

const _componentRoots = [""];
const _components = {};
const _dataComponents = {};
const _editComponents = {};
const _layoutComponents = {};
const _globalEditModificators = [];
const _editModificators = {};

export function addComponent(componentId, WrappedComponent) {
    addObjectPropertyByPath(_components, componentId, WrappedComponent);
}

export const withWrapper = createPublicHook("hooks.component", hooks => (componentId, WrappedComponent) => {
    let Component = WrappedComponent;
    let generated = false;

    const generate = () => {
        if (generated) {
            return;
        }

        let HOCs = hooks[componentId];

        if (HOCs) {
            HOCs.forEach(HOC => {
                Component = HOC(Component);
            });
        }

        generated = true;
    }

    return props => {
        generate();

        return (<Component {...props}/>)
    }
});

/**
 * @param {string} name
 */
export function addComponentRoot(name) {
    _componentRoots.push(name);
}

registerPublicEndpoint("hooks.addComponentRoot", addComponentRoot);

/**
 * @return {[]}
 */
export function getComponentRoots() {
    return _componentRoots;
}

registerPublicEndpoint("hooks.getComponentRoots", getComponentRoots);

/**
 * @param name
 * @returns {*}
 */
export function getComponent(name) {
    return getObjectPropertyByPath(_components, name);
}

registerPublicEndpoint("hooks.getComponent", getComponent);

/**
 * @param {{}} args
 */
export function addDataComponent(args) {
    const {
        name,
        icon,
        label,
        component,
        config = {},
        componentPaths = [],
        defaultValues = {},
        renderConfig = {}
    } = args;

    const defaultValue = getEditDefaultValues(config, defaultValues);

    addObjectPropertyByPath(_editModificators, name, []);

    addObjectPropertyByPath(_dataComponents, name, {
        component,
        icon,
        label,
        config,
        componentPaths,
        defaultValue,
        renderConfig
    });
}

registerPublicEndpoint("hooks.addDataComponent", addDataComponent);

/**
 * @param {function} modificator
 */
export function addGlobalEditModificator(modificator) {
    _globalEditModificators.push(modificator);
}

registerPublicEndpoint("hooks.addGlobalEditModificator", addGlobalEditModificator);

/**
 * @param {string} name
 * @param {function} modificator
 */
export function addEditModificator(name, modificator) {
    _editModificators[name].push(modificator);
}

registerPublicEndpoint("hooks.addEditModificator", addEditModificator);

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
 * @returns {{}}
 */
export function getDataComponentInformation(name) {
    return _dataComponents[name];
}

registerPublicEndpoint("hooks.getDataComponentInformation", getDataComponentInformation);

/**
 * @param name
 * @returns {*}
 */
export function getDataComponentConfig(name) {
    let config = _dataComponents[name]?.config;

    const modificators = _editModificators[name];

    if (!empty(modificators)) {
        modificators.forEach((modificator) => {
            config = modificator(config);
        });
    }

    if (!empty(_globalEditModificators)) {
        _globalEditModificators.forEach((modificator) => {
            config = modificator(config);
        });
    }

    return config;
}

registerPublicEndpoint("hooks.getDataComponentConfig", getDataComponentConfig);

/**
 * @param {{}} name
 * @returns {string}
 */
export function getComponentLabel(name) {
    return _dataComponents[name]?.label || name;
}

registerPublicEndpoint("hooks.getComponentLabel", getComponentLabel);

/**
 * @param {{}} name
 * @returns {string|null}
 */
export function getComponentIcon(name) {
    return _dataComponents[name]?.icon || null;
}

registerPublicEndpoint("hooks.getComponentIcon", getComponentIcon);

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

/**
 * @param name
 * @returns {*}
 */
export function getEditComponentDefaultValue(name) {
    return _editComponents[name]?.defaultValue;
}

/**
 * @param name
 * @returns {*}
 */
export function getEditComponent(name) {
    return _editComponents[name]?.component;
}

/**
 * @param {{}} args
 */
export function addLayoutComponent(args) {
    const {
        name,
        component
    } = args;

    addObjectPropertyByPath(_layoutComponents, name, {
        name,
        component
    });
}

/**
 * @param name
 * @returns {*}
 */
export function getLayoutComponent(name) {
    return _layoutComponents[name]?.component;
}

function DefaultEditWrapper(props) {
    const {children} = props;

    return children;
}

export function renderEdit(args) {
    const {
        fields,
        path,
        config,
        onChange = noop,
        Wrapper = DefaultEditWrapper
    } = args;

    return map(fields, (fieldConfig, name) => {
        const EditComponent = getEditComponent(fieldConfig.type);

        if (EditComponent) {
            return (
                <Wrapper fields={fields} fieldConfig={fieldConfig} key={name} name={name}>
                    <EditComponent
                        name={name}
                        path={path}
                        config={fieldConfig}
                        data={config?.[name] ? config[name] : null}
                        onChange={(data) => {
                            onChange(name, data);
                        }}
                    />
                </Wrapper>
            );
        }

        const LayoutComponent = getLayoutComponent(fieldConfig.type);

        if (LayoutComponent) {
            return (
                <LayoutComponent
                    key={name}
                    name={name}
                    path={path}
                    layoutConfig={fieldConfig}
                    config={config}
                    onChange={onChange}
                />
            );
        }

        return null;
    });
}