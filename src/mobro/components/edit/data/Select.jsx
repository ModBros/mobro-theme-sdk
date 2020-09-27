import FormGroup from "mobro/containers/shared/form/FormGroup";
import ReactSelect from "react-select";

function Select({name, config, data, onChange}) {
    return (
        <FormGroup label={name}>
            <ReactSelect value={config.options.find(value => value.value === data)} options={config.options} onChange={(value) => onChange(value.value)}/>
        </FormGroup>
    );
}

export default Select;