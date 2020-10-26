import FormGroup from "mobro/containers/shared/form/FormGroup";
import ReactSelect from "react-select";
import {getOptionByValue} from "mobro/utils/component/select";

function Select({name, config, data, onChange}) {
    return (
        <FormGroup label={name}>
            <ReactSelect value={getOptionByValue(config.options, data)} options={config.options} onChange={(value) => onChange(value.value)}/>
        </FormGroup>
    );
}

export default Select;