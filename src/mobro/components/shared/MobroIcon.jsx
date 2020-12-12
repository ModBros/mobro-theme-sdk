import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {getIcon, hasIcon} from "mobro/utils/icons";

function MobroIcon(props) {
    const {
        icon,
        className = "",
        ...iconProps
    } = props;

    if (hasIcon(icon)) {
        return (
            <span className={`mobro-icon ${className}`} dangerouslySetInnerHTML={{__html: getIcon(icon)}}></span>
        );
    }

    // fallback to fontawesome
    return (
        <FontAwesomeIcon
            icon={icon}
            className={className}
            {...iconProps}
        />
    );
}

export default MobroIcon;