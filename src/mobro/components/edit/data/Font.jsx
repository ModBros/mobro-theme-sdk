import FormGroup from "mobro/containers/edit/form/FormGroup";
import {withFetchingIndicator} from "mobro/utils/component/fetching";
import Select from "mobro/containers/shared/form/Select";
import {getOptionByValue, valueToOption} from "mobro/utils/component/select";
import {empty, map} from "mobro/utils/helper";
import StyleSelection from "mobro/containers/edit/data/font/StyleSelection";
import FamilySelect from "mobro/containers/edit/data/font/FamilySelect";

function Font(props) {
    const {
        name,
        config,
        data,
        onChange,
        fontListFetchingState,
        fontList,
        fetchFontList
    } = props;

    const fetching = withFetchingIndicator(fetchFontList, fontListFetchingState);

    if (fetching) {
        return fetching;
    }

    if (empty(fontList)) {
        return (
            <FormGroup label={name} info={config?.info}>
                <div className={"alert alert-danger"}>
                    Something went wrong fetching the font list!
                </div>
            </FormGroup>
        );
    }

    const family = data?.family;
    const style = data?.style;

    return (
        <FormGroup label={name} info={config?.info}>
            <FamilySelect
                fontList={fontList}
                family={family}
                onChange={(value) => onChange({
                    ...data,
                    family: value
                })}
            />

            {family != null &&
            <StyleSelection
                style={style}
                onChange={(value) => onChange({
                    ...data,
                    style: value
                })}
            />
            }
        </FormGroup>
    );
}

export default Font;