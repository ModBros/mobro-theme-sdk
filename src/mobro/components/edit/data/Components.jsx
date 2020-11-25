import {Fragment} from "react";
import ComponentsBar from "mobro/containers/edit/ComponentsBar";
import AddComponentButton from "mobro/containers/edit/AddComponentButton";
import {getComponentConfigPath, getDataOrDefault} from "mobro/utils/component";

function Components(props) {
    const {
        name,
        path,
        config,
        data
    } = props;

    const componentsPath = getComponentConfigPath(path, name);

    return (
        <Fragment>
            <ComponentsBar path={componentsPath} components={data.components}/>

            <AddComponentButton allowed={getDataOrDefault(config.allowed, [])} path={componentsPath}/>
        </Fragment>
    );
}

export default Components;