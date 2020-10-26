export function valuesToSelectOptions(values) {
    return values.map(valueToOption);
}

export function valueToOption(value) {
    return {
        value: value,
        label: value
    }
}

export function getOptionByValue(options, value) {
    return options.find(option => option.value === value);
}