import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function MobroIcon(props) {
    const {
        icon
    } = props;

    // todo check if internal library has given icon

    // fallback to fontawesome
    return (
        <FontAwesomeIcon
            icon={icon}
        />
    );
}

export default MobroIcon;