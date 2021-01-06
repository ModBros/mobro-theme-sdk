import {empty} from "mobro/utils/helper";
import {getComponentConfigPath, getComponentsFromConfig, renderComponents} from "mobro/utils/component";
import ComponentLabel from "mobro/containers/shared/ComponentLabel";

function ValueTable(props) {
    const {
        path,
        config,
        selectedComponent
    } = props;

    const components = getComponentsFromConfig(config.components);
    const label = config.label;

    if (empty(components)) {
        return null;
    }

    return (
        <div className={"w-100"}>
            <ComponentLabel label={label}/>

            {renderComponents(components, getComponentConfigPath(path, "components"), ({Component, type, path, config}) => (
                <div key={path} className={selectedComponent === path ? "selection-indicator" : ""} id={path}>
                    <Component path={path} config={config}/>
                </div>
            ))}
        </div>
    );
}

export default ValueTable;