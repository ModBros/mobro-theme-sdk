import FormGroup from "mobro/containers/shared/form/FormGroup";

function Select({name, config, data, onChange}) {
    return (
        <FormGroup label={name}>
            <select value={data} onChange={(event) => onChange(event.target.value)} className="form-control">
                {config.options.map(({label, value}) => (
                    <option key={value} value={value}>
                        {label}
                    </option>
                ))}
            </select>
        </FormGroup>
    );
}

export default Select;