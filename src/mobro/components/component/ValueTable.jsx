import {empty} from "mobro/utils/helper";
import {
    getComponentConfigPath,
    getComponentPath,
    getComponentsFromConfig,
    renderComponents
} from "mobro/utils/component";

function ValueTable(props) {
    const {
        path,
        config,
        selectedComponent
    } = props;

    const components = getComponentsFromConfig(config.components);

    if (empty(components)) {
        return null;
    }

    return (
        <div className={"w-100"}>
            {renderComponents(components, getComponentConfigPath(path, "components"), ({Component, type, path, config}) => (
                <div key={path} className={selectedComponent === path ? "selection-indicator" : ""} id={path}>
                    <Component path={path} config={config}/>
                </div>
            ))}
        </div>
    );
}

export default ValueTable;