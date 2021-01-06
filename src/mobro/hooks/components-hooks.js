import {createPublicHook} from "mobro/utils/hooks";
import {addObjectPropertyByPath, getObjectPropertyByPath} from "mobro/utils/object";
import {registerPublicEndpoint} from "mobro/utils/public";
import {getDataOrDefault, getEditDefaultValues} from "mobro/utils/component";
import {empty, map, noop} from "mobro/utils/helper";
import React from "react";

const _componentRoots = [""];
const _components = {};
const _widgets = {};
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
export function addWidget(args) {
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

    addObjectPropertyByPath(_widgets, name, {
        component,
        icon,
        label,
        config,
        componentPaths,
        defaultValue,
        renderConfig
    });
}

registerPublicEndpoint("hooks.addWidget", addWidget);
registerPublicEndpoint("hooks.addDataComponent", addWidget);

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
    return _widgets[name]?.component;
}

registerPublicEndpoint("hooks.getDataComponent", getDataComponent);

/**
 * @returns {{}}
 */
export function getDataComponents() {
    return _widgets;
}

registerPublicEndpoint("hooks.getDataComponents", getDataComponents);

/**
 * @returns {{}}
 */
export function getDataComponentInformation(name) {
    return _widgets[name];
}

registerPublicEndpoint("hooks.getDataComponentInformation", getDataComponentInformation);

/**
 * @param name
 * @returns {*}
 */
export function getWidgetConfig(name) {
    let config = _widgets[name]?.config;

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

registerPublicEndpoint("hooks.getWidgetConfig", getWidgetConfig);

/**
 * @param {{}} name
 * @returns {string}
 */
export function getWidgetLabel(name) {
    return _widgets[name]?.label || name;
}

registerPublicEndpoint("hooks.getWidgetLabel", getWidgetLabel);

/**
 * @param {{}} name
 * @returns {string|null}
 */
export function getWidgetIcon(name) {
    return _widgets[name]?.icon || null;
}

registerPublicEndpoint("hooks.getWidgetIcon", getWidgetIcon);

/**
 * @param name
 * @returns {{}}
 */
export function getWidgetDefaultValue(name) {
    return getDataOrDefault(_widgets[name]?.defaultValue, {});
}

registerPublicEndpoint("hooks.getWidgetDefaultValue", getWidgetDefaultValue);

/**
 * @param name
 * @returns {{}}
 */
export function getWidgetRenderConfig(name) {
    return getDataOrDefault(_widgets[name]?.renderConfig, {});
}

registerPublicEndpoint("hooks.getWidgetRenderConfig", getWidgetRenderConfig);

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