import {
    getComponentIcon,
    getComponentLabel,
    getDataComponentInformation,
    getDataComponents
} from "mobro/hooks/components-hooks";
import {map, noop} from "mobro/utils/helper";
import MobroIcon from "mobro/containers/shared/MobroIcon";

function ComponentSelection(props) {
    const {
        allowed = [],
        onSelect = noop
    } = props;

    const allowedComponents = allowed.length ? allowed : Object.keys(getDataComponents());

    return (
        <div className={"row row-gutter-1"}>
            {map(allowedComponents, (component) => (
                <div key={component} className={"col-6 d-flex"}>
                    <div className="card card-clickable w-100" onClick={() => onSelect(component)}>
                        <div className="card-body p-2 d-flex flex-column align-items-center">
                            {getComponentIcon(component) !== null && (
                                <div className={"text-center my-1"}>
                                    <MobroIcon icon={getComponentIcon(component)}/>
                                </div>
                            )}

                            <h6 className="m-0 text-uppercase text-center">
                                {getComponentLabel(component)}
                            </h6>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ComponentSelection;