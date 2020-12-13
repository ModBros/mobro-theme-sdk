import FormGroup from "mobro/containers/edit/form/FormGroup";
import {getDataOrDefault} from "mobro/utils/component";

function Input({name, config, data, onChange}) {
    data = getDataOrDefault(data, "");

    return (
        <FormGroup label={name} info={config?.info}>
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