import FormGroup from "mobro/containers/edit/form/FormGroup";
import {getOptionByValue} from "mobro/utils/component/select";
import FormSelect from "mobro/containers/shared/form/Select";

function Select(props) {
    const {
        name,
        config,
        data,
        onChange
    } = props;

    return (
        <FormGroup label={name} info={config?.info}>
            <FormSelect
                value={getOptionByValue(config.options, data)}
                options={config.options}
                onChange={(value) => onChange(value.value)}
            />
        </FormGroup>
    );
}

export default Select;