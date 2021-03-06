import ComponentsBar from "mobro/containers/edit/ComponentsBar";
import AddComponentButton from "mobro/containers/edit/AddComponentButton";
import {getComponentConfigPath, getDataOrDefault} from "mobro/utils/component";
import FormGroup from "mobro/containers/edit/form/FormGroup";

function Widgets(props) {
    const {
        name,
        path,
        config,
        data
    } = props;

    const componentsPath = getComponentConfigPath(path, name);

    return (
        <FormGroup label={name} info={config?.info}>
            <ComponentsBar path={componentsPath} components={data?.components}/>

            <AddComponentButton allowed={getDataOrDefault(config.allowed, [])} path={componentsPath}/>
        </FormGroup>
    );
}

export default Widgets;