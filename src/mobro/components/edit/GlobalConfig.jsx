import {Fragment} from "react";
import {withGlobalConfigHook} from "mobro/hooks/global-config-hook";
import FormGroup from "mobro/containers/shared/form/FormGroup";
import {empty, map, noop} from "mobro/utils/helper";
import {getEditComponent} from "mobro/hooks/components-hooks";

function GlobalConfig(props) {
    const {
        layout,
        directEdit = noop,
        layoutEdit = noop
    } = props;

    const editConfig = withGlobalConfigHook()({
        rowHeight: {
            type: "numeric"
        }
    });

    return (
        <Fragment>
            <FormGroup label={"Device Width (px)"}>
                <input
                    className={"form-control"}
                    value={layout?.width ? layout.width : ""}
                    onChange={(event) => directEdit({name: "width", data: event.target.value})}
                />
            </FormGroup>

            <FormGroup label={"Device Height (px)"}>
                <input
                    className={"form-control"}
                    value={layout?.height ? layout.height : ""}
                    onChange={(event) => directEdit({name: "height", data: event.target.value})}
                />
            </FormGroup>

            {!empty(editConfig) && map(editConfig, (fieldConfig, name) => {
                const EditComponent = getEditComponent(fieldConfig.type);

                if(!EditComponent) {
                    return null;
                }

                return (
                    <EditComponent
                        key={name}
                        name={name}
                        path={""}
                        config={fieldConfig}
                        data={layout?.config?.[name] ? layout.config[name] : null}
                        onChange={(data) => layoutEdit({path: "", name, data})}
                    />
                );
            })}
        </Fragment>
    );
}

export default GlobalConfig;