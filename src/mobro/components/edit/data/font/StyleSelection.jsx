import {empty, map, noop} from "mobro/utils/helper";
import Checkbox from "mobro/containers/shared/form/Checkbox";
import {BOLD, ITALIC} from "mobro/enum/font-style";

function StyleSelection(props) {
    const {
        style,
        onChange = noop
    } = props;

    return map([BOLD, ITALIC], (familyStyle) => (
        <Checkbox
            key={familyStyle}
            className={"d-inline-block mr-2"}
            inverse={true}
            label={familyStyle}
            value={familyStyle}
            checked={style === familyStyle}
            onChange={(value) => onChange(value)}
        />
    ));
}

export default StyleSelection;