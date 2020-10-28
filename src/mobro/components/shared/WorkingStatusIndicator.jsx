import {FAILED, WORKING} from "mobro/enum/working-status";
import LoadingIndicator from "mobro/containers/shared/LoadingIndicator";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function WorkingStatusIndicator(props) {
    const {
        status,
        className = ""
    } = props;

    if(!status) {
        return null;
    }

    if (status === WORKING) {
        return (
            <LoadingIndicator className={`small ${className}`}/>
        )
    }

    const icon = status === FAILED ? "exclamation-triangle" : "check";
    const color = status === FAILED ? "text-danger" : "text-success";

    return (
        <div className={`working-status-indicator ${color} ${className}`}>
            <FontAwesomeIcon icon={icon}/>
        </div>
    );
}

export default WorkingStatusIndicator;