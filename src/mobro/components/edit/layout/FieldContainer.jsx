import {renderEdit} from "mobro/hooks/components-hooks";
import {count} from "mobro/utils/helper";

function Wrapper(props) {
    const {
        fields,
        fieldConfig,
        children
    } = props;

    const fieldCount = count(fields);
    const colWidth = fieldConfig?.layoutWidth || Math.round(12 / fieldCount)

    return (
        <div className={`field-container-wrapper col col-${colWidth}`}>
            {children}
        </div>
    );
}

function FieldContainer(props) {
    const {
        path,
        layoutConfig,
        config,
        onChange
    } = props;

    return (
        <div className={`field-container form-group row align-items-center no-gutters`}>
            {renderEdit({
                fields: layoutConfig?.children,
                path,
                config,
                onChange,
                Wrapper
            })}
        </div>
    );
}

export default FieldContainer;