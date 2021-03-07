import {noop} from "mobro/utils/helper";

function Checkbox(props) {
    const {
        label,
        value,
        checked = false,
        onChange = noop,
        className = "",
        inverse = false
    } = props;

    const inputLabel = (
        <span key={"label"}>
            {label}
        </span>
    );

    const input = (
        <input
            key={"input"}
            className="mx-1"
            type="checkbox"
            value={value}
            checked={checked}
            onChange={(event) => {
                onChange(event.target.checked ? event.target.value : null);
            }}
        />
    );

    let children = [
        inputLabel,
        input
    ];

    if (inverse) {
        children = children.reverse();
    }

    return (
        <div className={`form-group ${className}`}>
            <label>
                {children}
            </label>
        </div>
    );
}

export default Checkbox;