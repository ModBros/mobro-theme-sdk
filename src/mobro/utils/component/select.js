import {map} from "mobro/utils/helper";
import MobroIcon from "mobro/containers/shared/MobroIcon";

export function valuesToSelectOptions(values) {
    return map(values, valueToOption);
}

export function valueToOption(value) {
    return {
        value: value,
        label: value
    }
}

export function applyValueIconToOptions(options) {
    return map(options, (option) => ({
       ...option,
        icon: <MobroIcon icon={getValueIcon(option.value)}/>
    }));
}

export function getValueIcon(value) {
    return "plus"; // todo should be `option-${value}` later on
}

export function getOptionByValue(options, value) {
    return options.find(option => option.value === value);
}