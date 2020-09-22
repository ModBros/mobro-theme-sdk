import FormGroup from "mobro/containers/shared/form/FormGroup";

function Input({name, data, onChange}) {
    return (
        <FormGroup label={name}>
            <input
                className="form-control"
                type="text"
                value={data}
                onChange={(event) => onChange(event.target.value)}
            />
        </FormGroup>
    );
}

export default Input;