import {ChromePicker} from "react-color";
import {getDataOrDefault} from "mobro/utils/component";
import {useState, useEffect, useRef} from "react";
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

    const wrapperRef = useRef(null);
    const [show, setShow] = useState(false);
    const [color, setColor] = useState(getDataOrDefault(data, defaultColorValue));

    useEffect(() => {
        const handleDocumentClick = () => {
            setShow(false);
        }

        document.addEventListener("mousedown", handleDocumentClick);

        return () => {
            document.removeEventListener("mousedown", handleDocumentClick);
        }
    })

    return (
        <FormGroup label={name} info={config?.info}>
            <div className={"d-flex align-items-center position-relative"} onMouseDown={(event) => event.stopPropagation()}>
                <div
                    className={"color-preview"}
                    onClick={() => setShow(!show)}
                    style={{
                        backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
                    }}
                ></div>

                <small className={"text-white mx-2"}>
                    {data ? `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})` : "No color selected yet"}
                </small>

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

                {show ? <div className={"color-popover mt-2"}>
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
            </div>
        </FormGroup>
    )
}

export default Color;