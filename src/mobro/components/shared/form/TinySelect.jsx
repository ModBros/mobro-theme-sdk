import Select from "mobro/containers/shared/form/Select";

const defaultStyles = {
    control: (provided) => ({
        ...provided,
        paddingTop: 0,
        paddingBottom: 0,
        minHeight: "auto"
    }),

    indicatorsContainer: (provided) => ({
        ...provided,
        padding: 0
    }),

    dropdownIndicator: (provided) => ({
        ...provided,
        paddingTop: 1,
        paddingBottom: 1
    }),

    valueContainer: (provided) => ({
        ...provided,
        paddingTop: 0,
        paddingBottom: 0,
        fontSize: "0.75rem"
    }),

    input: (provided) => ({
        fontSize: "0.75rem"
    })
};

function TinySelect(props) {
    const {
        styles = {},
        ...rest
    } = props;

    return (
        <Select
            styles={{...defaultStyles, ...styles}}
            {...rest}
        />
    );
}

export default TinySelect;