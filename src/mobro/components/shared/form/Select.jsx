import ReactSelect from "react-select";
import {map} from "mobro/utils/helper";

const defaultStyles = {
    option: (provided, state) => ({
        ...provided,
        color: state.isSelected || state.isFocused ? "white" : "black",
        background: state.isSelected || state.isFocused ? "#ea5b5d" : "transparent"
    }),

    control: (provided) => ({
        ...provided,
        border: "none",
        boxShadow: "none",
        borderColor: "transparent"
    })
};

function Select(props) {
    const {
        styles = {},
        ...selectProps
    } = props;

    const selectStyles = {...defaultStyles};

    map(styles, (style, name) => {
        const defaultStyle = selectStyles[name];

        if (defaultStyle) {
            selectStyles[name] = (provided, state) => style(defaultStyle(provided, state), state);
        } else {
            selectStyles[name] = style;
        }
    });

    return (
        <ReactSelect
            styles={selectStyles}
            {...selectProps}
        />
    );
}

export default Select;