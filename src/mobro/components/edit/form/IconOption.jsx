import {components} from "react-select";

function IconOption(props) {
    const {
        data
    } = props;

    return (
        <components.Option {...props}>
            {data.icon !== null ? (
                <span className={"mr-2"}>
                    {data.icon}
                </span>
            ) : null}

            {data.label}
        </components.Option>
    )
}

export default IconOption;