import FormGroup from "mobro/containers/edit/form/FormGroup";
import {getDataOrDefault} from "mobro/utils/component";

function Numeric(props) {
    const {
        name,
        config,
        data,
        onChange
    } = props;

    const value = getDataOrDefault(data, "");

    return (
        <FormGroup label={name} info={config?.info}>
            <input
                className="form-control"
                type="number"
                min={config.min}
                max={config.max}
                value={value}
                onChange={(event) => {
                    const val = event.target.value;

                    if (
                        config.min !== null &&
                        config.min > parseFloat(val)
                    ) {
                        return;
                    }

                    if (
                        config.max !== null &&
                        config.max < parseFloat(val)
                    ) {
                        return;
                    }

                    onChange(val)
                }}
            />
        </FormGroup>
    );
}

export default Numeric;