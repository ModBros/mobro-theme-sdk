import {ChromePicker} from "react-color";
import {getDataOrDefault} from "mobro/utils/component";
import {useState} from "react";
import FormGroup from "mobro/containers/edit/form/FormGroup";
import IconButton from "mobro/containers/edit/button/IconButton";

export const defaultColorValue = {
    r: 0,
    g: 0,
    b: 0,
    a: 1
};

function Color(props) {
    const {
        name,
        config,
        data,
        onChange
    } = props;

    const [show, setShow] = useState(false);
    const [color, setColor] = useState(getDataOrDefault(data, defaultColorValue));

    return (
        <FormGroup label={name} info={config?.info}>
            <div className={"d-flex align-items-center"}>
                <div
                    className={"color-preview"}
                    onClick={() => setShow(!show)}
                    style={{
                        backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
                    }}
                ></div>

                <span className={"text-white mx-2"}>
                    {data ? `R[${color.r}] G[${color.g}] B[${color.b}] A[${color.a}]` : "No color selected yet"}
                </span>

                {data !== null && (
                    <IconButton
                        size={"sm"}
                        variant={"danger"}
                        icon={"trash"}
                        onClick={() => {
                            setColor(defaultColorValue);
                            onChange(null);
                        }}
                    >
                        clear
                    </IconButton>
                )}
            </div>

            {show ? <div className={"color-popover mt-2"}>
                <div className={"color-cover"} onClick={() => setShow(false)}/>

                <ChromePicker
                    color={color}
                    onChange={(color) => {
                        setColor(color.rgb)
                    }}
                    onChangeComplete={(color) => {
                        setColor(color.rgb);
                        onChange(color.rgb)
                    }}
                />
            </div> : null}
        </FormGroup>
    )
}

export default Color;