import {renderEdit} from "mobro/hooks/components-hooks";
import {count, map} from "mobro/utils/helper";

function FieldContainer(props) {
    const {
        path,
        layoutConfig,
        config,
        onChange
    } = props;

    return (
        <div className={`field-container form-group row align-items-center no-gutters`}>
            {map(layoutConfig?.children, (child, i) => {
                const fieldCount = count(child?.children);
                const colWidth = child?.width || Math.round(12 / fieldCount)

                return (
                    <div key={i} className={`field-container-wrapper col col-${colWidth}`}>
                        {renderEdit({
                            fields: child?.children,
                            path,
                            config,
                            onChange
                        })}
                    </div>
                );
            })}
        </div>
    );
}

export default FieldContainer;