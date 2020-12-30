import {noop} from "mobro/utils/helper";
import IconButton from "mobro/components/edit/button/IconButton";

function CollapseButton(props) {
    const {
        collapsed = false,
        onClick = noop,
        collapsedIcon = "chevron-down",
        collapseIcon = "chevron-up"
    } = props;

    return (
        <IconButton
            onClick={onClick}
            variant={"link"}
            size={"sm"}
            icon={collapsed ? collapsedIcon : collapseIcon}
        />
    );
}

export default CollapseButton;