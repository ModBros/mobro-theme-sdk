import {noop} from "mobro/utils/helper";
import IconButton from "mobro/containers/shared/button/IconButton";

function Footer(props) {
    const {
        path,
        removeComponent = noop
    } = props;

    return (
        <IconButton icon={"trash"} className={"w-100"} onClick={removeComponent}>
            Remove Component
        </IconButton>
    );
}

export default Footer;