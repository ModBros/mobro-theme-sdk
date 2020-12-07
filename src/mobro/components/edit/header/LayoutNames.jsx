import ReactSelect from "react-select";
import {valuesToSelectOptions, valueToOption} from "mobro/utils/component/select";
import {noop} from "mobro/utils/helper";
import React from "react";
import {withFetchingIndicator} from "mobro/utils/component/fetching";
import IconButton from "mobro/containers/edit/button/IconButton";

function LayoutNames(props) {
    const {
        layoutName,
        layoutNames,
        editmode,
        layoutNamesFetchingState,
        fetchLayoutNames = noop,
    } = props;

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
                    />

                    <IconButton
                        size={"sm"}
                        className={"text-white p-0 ml-2 line-height-1"}
                        variant={"link"}
                        icon={"copy"}
                    />
                </div>
            </div>

            <ReactSelect
                styles={selectStyles}
                value={valueToOption(layoutName)}
                options={valuesToSelectOptions(layoutNames)}
            />
        </div>
    );
}

export default LayoutNames;