import {empty} from "mobro/utils/helper";
import {getComponentsFromConfig, renderComponents} from "mobro/utils/component";

function ValueTable(props) {
    const {
        path,
        config
    } = props;

    const components = getComponentsFromConfig(config.components);

    if (empty(components)) {
        return null;
    }

    return (
        <div className={"w-100"}>
            {renderComponents(components, path, (Component, type, path, config) => (
                <Component key={path} path={path} config={config}/>
            ))}
        </div>
    );
}

export default ValueTable;