import FormGroup from "mobro/containers/edit/form/FormGroup";
import {getDataOrDefault} from "mobro/utils/component";

function Numeric({name, config, data, onChange}) {
    data = getDataOrDefault(data, "");

    return (
        <FormGroup label={name}>
            <input
                className="form-control"
                type="number"
                min={config.min}
                max={config.max}
                value={data}
                onChange={(event) => onChange(event.target.value)}
            />
        </FormGroup>
    );
}

export default Numeric;