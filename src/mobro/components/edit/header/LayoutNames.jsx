import ReactSelect from "react-select";
import {valuesToSelectOptions, valueToOption} from "mobro/utils/component/select";
import {noop} from "mobro/utils/helper";
import React, {useState} from "react";
import {withFetchingIndicator} from "mobro/utils/component/fetching";
import IconButton from "mobro/containers/edit/button/IconButton";
import Modal from "react-bootstrap/Modal";
import FormGroup from "mobro/containers/edit/form/FormGroup";

function sanitizeLayoutName(layoutName) {
    return layoutName.replace(/[^\w_\-]/g, "");
}

function LayoutNames(props) {
    const {
        layout,
        layoutName,
        layoutNames,
        editmode,
        layoutNamesFetchingState,
        fetchLayoutNames = noop,
        changeLayout = noop,
        deleteLayout = noop
    } = props;

    const [modalState, setModalState] = useState({
        show: false,
        type: null,
        title: "",
        layoutName: ""
    });

    const fetching = withFetchingIndicator(fetchLayoutNames, layoutNamesFetchingState);

    if (fetching) {
        return fetching;
    }

    const selectStyles = {
        control: (provided) => ({
            ...provided,
            width: editmode?.sidebarWidth - 8,
            paddingTop: 0,
            paddingBottom: 0,
            minHeight: "auto"
        }),

        indicatorsContainer: (provided) => ({
            ...provided,
            padding: 0
        }),

        dropdownIndicator: (provided) => ({
            ...provided,
            paddingTop: 1,
            paddingBottom: 1
        }),

        valueContainer: (provided) => ({
            ...provided,
            paddingTop: 0,
            paddingBottom: 0,
            fontSize: "0.75rem"
        }),

        input: (provided) => ({
            fontSize: "0.75rem"
        })
    }

    return (
        <div>
            <div className={"d-flex align-items-center justify-content-between mb-1"}>
                <small className={"line-height-1"}>Layout</small>

                <div className={"d-flex align-items-center"}>
                    <IconButton
                        size={"sm"}
                        className={"text-white p-0 line-height-1"}
                        variant={"link"}
                        icon={"plus-square"}
                        onClick={() => setModalState({
                            ...modalState,
                            show: true,
                            type: "add",
                            title: "Add Layout",
                            layoutName: ""
                        })}
                    />

                    <IconButton
                        size={"sm"}
                        className={"text-white p-0 ml-2 line-height-1"}
                        variant={"link"}
                        icon={"copy"}
                        onClick={() => setModalState({
                            ...modalState,
                            show: true,
                            type: "copy",
                            title: "Copy Layout",
                            layoutName: sanitizeLayoutName(layoutName + "_copy")
                        })}
                    />

                    <IconButton
                        size={"sm"}
                        className={"text-white p-0 ml-2 line-height-1"}
                        variant={"link"}
                        icon={"trash"}
                        onClick={() => {
                            deleteLayout(layoutName);
                        }}
                    />
                </div>
            </div>

            <ReactSelect
                styles={selectStyles}
                value={valueToOption(layoutName)}
                options={valuesToSelectOptions(layoutNames)}
                onChange={(value) => {
                    changeLayout(value.value);
                }}
            />

            <Modal show={modalState.show} onHide={() => setModalState({...modalState, show: false})}>
                <Modal.Header closeButton>
                    {modalState.title}
                </Modal.Header>

                <Modal.Body>
                    <FormGroup label={"Layout name"}>
                        <input
                            type={"text"}
                            value={modalState.layoutName}
                            onChange={(event) => setModalState({...modalState, layoutName: sanitizeLayoutName(event.target.value)})}
                            className={"form-control"}
                        />
                    </FormGroup>
                </Modal.Body>

                <Modal.Footer>
                    <IconButton
                        icon={"save"}
                        onClick={() => {
                            changeLayout(modalState.layoutName, modalState.type === "copy" ? layout : null);
                            setModalState({...modalState, show: false});
                        }}
                    >
                        save
                    </IconButton>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default LayoutNames;