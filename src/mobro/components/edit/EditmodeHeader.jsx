import TriggerGlobalConfigButton from "mobro/containers/edit/TriggerGlobalConfigButton";
import {noop} from "mobro/utils/helper";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import LayoutNames from "mobro/containers/edit/header/LayoutNames";
import {valuesToSelectOptions, valueToOption} from "mobro/utils/component/select";
import {ZOOM_LEVELS} from "mobro/enum/zoom-levels";
import TinySelect from "mobro/containers/shared/form/TinySelect";
import {getDeviceResolution} from "mobro/utils/socket";

function EditmodeHeader(props) {
    const {
        layoutConfig,
        zoomLevel,
        layoutEdit = noop,
        setZoomLevel = noop,
        adaptToDeviceResolution = noop
    } = props;

    return (
        <div className={"d-flex align-items-center justify-content-between"}>
            <div className={"d-flex justify-content-between"}>
                <div>
                    <div className={"d-flex align-items-center justify-content-between"}>
                        <small>
                            Resolution
                        </small>
                    </div>

                    <div className={"d-flex align-items-center flex-nowrap"}>
                        <span>
                            <input
                                type={"text"}
                                className={"form-control form-control-sm form-control-inline"}
                                value={layoutConfig?.width || ""}
                                onChange={(event) => {
                                    layoutEdit({name: "width", data: event.target.value})
                                }}
                            />
                        </span>

                        <small className={"px-2"}>
                            <FontAwesomeIcon icon={"times"}/>
                        </small>

                        <span>
                            <input
                                type={"text"}
                                value={layoutConfig?.height || ""}
                                className={"form-control form-control-sm form-control-inline"}
                                onChange={(event) => {
                                    layoutEdit({name: "height", data: event.target.value})
                                }}
                            />
                        </span>

                        <span
                            className={"clickable ml-3 d-flex align-items-center"}
                            onClick={() => {
                                layoutEdit({name: "width", data: layoutConfig?.height});
                                layoutEdit({name: "height", data: layoutConfig?.width});
                            }}
                        >
                            <FontAwesomeIcon icon={"retweet"}/>

                            <span className={"ml-1"}>
                                Rotate
                            </span>
                        </span>

                        {getDeviceResolution() ? (
                            <span
                                className={"text-white clickable ml-3 d-flex align-items-center"}
                                onClick={() => adaptToDeviceResolution()}
                                title={"Use device resolution"}
                            >
                                <FontAwesomeIcon icon={"tablet-alt"}/>

                                <span className={"ml-1"}>
                                    Use device resolution
                                </span>
                            </span>
                        ) : null}
                    </div>
                </div>

                <div className={"ml-3"}>
                    <div className={"d-flex align-items-center justify-content-between"}>
                        <small>&nbsp;</small>
                    </div>

                    <div>
                        <TinySelect
                            styles={{
                                control: (provided) => ({
                                    ...provided,
                                    width: 85,
                                    paddingTop: 2,
                                    paddingBottom: 0,
                                    minHeight: "auto"
                                })
                            }}
                            value={valueToOption(zoomLevel)}
                            options={valuesToSelectOptions(ZOOM_LEVELS)}
                            onChange={(value) => setZoomLevel(value.value)}
                        />
                    </div>
                </div>
            </div>

            <div className={"d-flex align-items-center flex-nowrap"}>
                <small>
                    <TriggerGlobalConfigButton/>
                </small>

                <LayoutNames/>
            </div>
        </div>
    );
}

export default EditmodeHeader;