import {renderEdit} from "mobro/hooks/components-hooks";

function Wrapper(props) {
    const {children} = props;

    return (
        <div className={"field-container-wrapper"}>
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
        <div className={`field-container form-group d-flex align-items-center`}>
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