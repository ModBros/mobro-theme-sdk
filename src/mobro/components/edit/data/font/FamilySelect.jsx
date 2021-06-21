import {memo} from 'react';
import {map, noop} from 'mobro/utils/helper';
import {getOptionByValue, valueToOption} from 'mobro/utils/component/select';
import Select from 'mobro/containers/shared/form/Select';

function FamilySelect(props) {
    const {
        fontList,
        family,
        onChange = noop
    } = props;

    const options = [{value: null, label: 'none'}].concat(map(fontList, (font, family) => valueToOption(family)));

    return (
        <Select
            placeholder={'select font family'}
            options={options}
            value={getOptionByValue(options, family)}
            onChange={(value) => onChange(value.value)}
            styles={{
                option: (styles, {data}) => ({
                    ...styles,
                    fontFamily: data.value
                })
            }}
        />
    );
}

export default memo(FamilySelect);