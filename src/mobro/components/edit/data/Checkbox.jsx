import InputCheckbox from "mobro/containers/shared/form/Checkbox";

function Checkbox(props) {
    const {
        name,
        data,
        onChange
    } = props;

    return (
        <InputCheckbox
            label={name}
            value={!!data}
            checked={!!data}
            onChange={(value) => onChange(!!value)}
        />
    );
}

export default Checkbox;