import {extractFlexAlign} from "mobro/utils/component";
import dotPropImmutable from "dot-prop-immutable";

function Text(props) {
    const {
        config
    } = props;

    return (
        <span className={`w-100 d-flex align-items-center ${extractFlexAlign(dotPropImmutable.get(config, "align"))}`}>
            {config.text}
        </span>
    );
}

export default Text;