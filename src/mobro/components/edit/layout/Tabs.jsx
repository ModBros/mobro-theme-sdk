import ConcreteTabs from "mobro/containers/edit/layout/tabs/tabs";
import {renderEdit} from "mobro/hooks/components-hooks";
import {map} from "mobro/utils/helper";
import Tab from "mobro/containers/edit/layout/tabs/Tab";

function Tabs(props) {
    const {
        path,
        layoutConfig,
        config,
        onChange
    } = props;

    return (
        <div className={"form-group"}>
            <ConcreteTabs>
                {map(layoutConfig?.children, (child, name) => (
                    <Tab key={name} label={child?.label || name}>
                        {renderEdit({
                            fields: child?.children,
                            path,
                            config,
                            onChange
                        })}
                    </Tab>
                ))}
            </ConcreteTabs>
        </div>
    );
}

export default Tabs;