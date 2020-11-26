import ComponentsBar from "mobro/containers/edit/ComponentsBar";
import AddComponentButton from "mobro/containers/edit/AddComponentButton";
import {getComponentConfigPath, getDataOrDefault} from "mobro/utils/component";
import FormGroup from "mobro/containers/edit/form/FormGroup";

function Components(props) {
    const {
        name,
        path,
        config,
        data
    } = props;

    const componentsPath = getComponentConfigPath(path, name);

    return (
        <FormGroup label={name}>
            <ComponentsBar path={componentsPath} components={data.components}/>

            <span className={"my-2"}>&nbsp;</span>

            <AddComponentButton allowed={getDataOrDefault(config.allowed, [])} path={componentsPath}/>
        </FormGroup>
    );
}

export default Components;