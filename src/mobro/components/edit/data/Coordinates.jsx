import MobroIcon from "mobro/containers/shared/MobroIcon";
import {noop} from "mobro/utils/helper";
import FormGroup from "mobro/containers/edit/form/FormGroup";

function Control(props) {
    const {
        className,
        icon,
        onClick = noop
    } = props;

    return (
        <div className={`coordinates-control ${className}`} onClick={onClick}>
            <MobroIcon icon={icon}/>
        </div>
    );
}

function updateValue(onChange, data, variable, value, force = false) {
    onChange({
        ...data,
        [variable]: (data?.[variable] && !force) ? data?.[variable] + parseInt(value) : parseInt(value)
    });
}

function Coordinates(props) {
    const {
        name,
        data,
        onChange
    } = props;

    return (
        <FormGroup label={name}>
            <div className={"coordinates"}>
                <div className={"coordinates-controls"}>
                    <Control
                        className={"up-10"}
                        icon={"angle-double-up"}
                        onClick={() => updateValue(onChange, data, "y", -10)}
                    />

                    <Control
                        className={"up-1"}
                        icon={"angle-up"}
                        onClick={() => updateValue(onChange, data, "y", -1)}
                    />

                    <Control
                        className={"down-10"}
                        icon={"angle-double-down"}
                        onClick={() => updateValue(onChange, data, "y", 10)}
                    />

                    <Control
                        className={"down-1"}
                        icon={"angle-down"}
                        onClick={() => updateValue(onChange, data, "y", 1)}
                    />

                    <Control
                        className={"left-10"}
                        icon={"angle-double-left"}
                        onClick={() => updateValue(onChange, data, "x", -10)}
                    />

                    <Control
                        className={"left-1"}
                        icon={"angle-left"}
                        onClick={() => updateValue(onChange, data, "x", -1)}
                    />

                    <Control
                        className={"right-10"}
                        icon={"angle-double-right"}
                        onClick={() => updateValue(onChange, data, "x", 10)}
                    />

                    <Control
                        className={"right-1"}
                        icon={"angle-right"}
                        onClick={() => updateValue(onChange, data, "x", 1)}
                    />
                </div>

                <div className={"d-flex align-items-center flex-nowrap justify-content-center"}>
                    <div className={"d-flex align-items-center flex-nowrap mr-3"}>
                        <small className={"text-white mr-1"}>x: </small>

                        <span>
                            <input
                                type={"number"}
                                className={"form-control form-control-sm form-control-inline"}
                                value={data?.x || 0}
                                onChange={(event) => updateValue(onChange, data, "x", event.target.value, true)}
                            />
                        </span>
                    </div>

                    <div className={"d-flex align-items-center flex-nowrap"}>
                        <small className={"text-white mr-1"}>y: </small>

                        <span>
                            <input
                                type={"number"}
                                value={data?.y || 0}
                                className={"form-control form-control-sm form-control-inline"}
                                onChange={(event) => updateValue(onChange, data, "y", event.target.value, true)}
                            />
                        </span>
                    </div>
                </div>
            </div>
        </FormGroup>
    );
}

export default Coordinates;