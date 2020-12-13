import {map} from "mobro/utils/helper";
import MobroIcon from "mobro/containers/shared/MobroIcon";
import {hasIcon} from "mobro/utils/icons";

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
    const iconName = `option_${value}`;

    if (hasIcon(iconName)) {
        return iconName;
    }

    return "misc";
}

export function getOptionByValue(options, value) {
    let found = null;

    options.forEach((option) => {
        if (option.options) {
            const subfound = getOptionByValue(option.options, value)

            if (subfound && !found) {
                found = subfound;
            }
        } else {
            if (option.value === value && !found) {
                found = option;
            }
        }
    });

    return found;
}