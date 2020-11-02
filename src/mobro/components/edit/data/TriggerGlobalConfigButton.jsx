import IconButton from "mobro/containers/shared/button/IconButton";
import {toggleSidebarComponent, withSidebar} from "mobro/utils/sidebar";
import GlobalConfig from "mobro/containers/edit/GlobalConfig";
import {isEditMode} from "mobro/utils/layout";
import {map} from "mobro/utils/helper";
import {deepValues} from "mobro/utils/object";

function TriggerGlobalConfigButton(props) {
    const {
        layoutMode,
        data
    } = props;

    if (!isEditMode(layoutMode)) {
        return null;
    }

    const
        name = "global_config",
        title = "Global Configuration",
        content = (<GlobalConfig/>),
        dependencies = map(data, (field) => {
            return deepValues(field);
        });

    withSidebar({name, title, content, dependencies});

    return (
        <IconButton
            icon={"cog"}
            round={true}
            size={"sm"}
            onClick={() => toggleSidebarComponent(name)}
        />
    );
}

export default TriggerGlobalConfigButton;