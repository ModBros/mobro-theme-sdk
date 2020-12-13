import {Fragment} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function FormGroup(props) {
    const {
        label,
        info,
        inline = false,
        children
    } = props;

    let infoBox = null;

    if(info) {
        infoBox = (
            <small className={"alert alert-dark p-1 d-flex align-items-center mb-2"}>
                <div className={"px-3"}>
                    <FontAwesomeIcon icon={"info"}/>
                </div>

                <div className={"flex-fill"}>
                    {info}
                </div>
            </small>
        );
    }

    return (
        <Fragment>
            <div className={`form-group ${inline ? "d-flex aling-items-center" : ""}`}>
                <div className={inline ? "mr-2 mb-0 d-inline-block" : ""}>
                    <label className={inline ? "mb-0" : ""}>
                        {label}
                    </label>
                </div>

                {!inline && infoBox}

                <div className={inline ? "flex-fill" : ""}>
                    {children}
                </div>
            </div>

            {inline && infoBox}
        </Fragment>
    );
}

export default FormGroup