import {ChromePicker} from "react-color";
import {getDataOrDefault} from "mobro/utils/component";
import {useState} from "react";
import FormGroup from "mobro/containers/edit/form/FormGroup";

export const defaultColorValue = {
    r: 0,
    g: 0,
    b: 0,
    a: 1
};

function Color(props) {
    const {
        name,
        data,
        onChange
    } = props;

    const [show, setShow] = useState(false);
    const [color, setColor] = useState(getDataOrDefault(data, defaultColorValue));

    return (
        <FormGroup label={name} inline={true}>
            <div
                className={"color-preview"}
                onClick={() => setShow(!show)}
                style={{
                    backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
                }}
            ></div>

            {show ? <div className={"color-popover mt-2"}>
                <div className={"color-cover"} onClick={() => setShow(false)}/>

                <ChromePicker
                    color={color}
                    onChange={(color) => setColor(color.rgb)}
                    onChangeComplete={(color) => onChange(color.rgb)}
                />
            </div> : null}
        </FormGroup>
    )
}

export default Color;