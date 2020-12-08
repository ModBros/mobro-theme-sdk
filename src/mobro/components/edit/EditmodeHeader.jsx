import TriggerGlobalConfigButton from "mobro/containers/edit/TriggerGlobalConfigButton";
import {noop} from "mobro/utils/helper";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import LayoutNames from "mobro/containers/edit/header/LayoutNames";

function EditmodeHeader(props) {
    const {
        layoutConfig,
        layoutEdit = noop
    } = props;

    return (
        <div className={"d-flex align-items-center justify-content-between"}>
            <div>
                <div className={"d-flex align-items-center justify-content-between"}>
                    <small>
                        Resolution
                    </small>

                    <small
                        className={"clickable"}
                        onClick={() => {
                            layoutEdit({name: "width", data: layoutConfig?.height});
                            layoutEdit({name: "height", data: layoutConfig?.width});
                        }}
                    >
                        <FontAwesomeIcon icon={"sync-alt"}/>
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