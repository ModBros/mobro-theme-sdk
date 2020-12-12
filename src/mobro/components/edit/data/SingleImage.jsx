import React, {useState} from "react";
import FileInput from "react-file-input-previews-base64";
import IconButton from "mobro/containers/edit/button/IconButton";
import {uploadFile} from "mobro/utils/file";
import {FINISHED, WORKING} from "mobro/enum/working-status";
import {FAILED} from "mobro/utils/communication";
import FormGroup from "mobro/containers/edit/form/FormGroup";
import Preview from "mobro/containers/edit/data/image/Preview";
import WorkingStatusIndicator from "mobro/containers/shared/WorkingStatusIndicator";

function SingleImage({name, data, onChange}) {
    const [status, setStatus] = useState(null);

    return (
        <FormGroup label={name}>
            <WorkingStatusIndicator status={status} className={"d-inline-block ml-2"}/>

            <Preview url={data?.url}/>

            <FileInput
                labelText={""}
                labelStyle={{display: "none"}}
                accept={"image/*"}
                imagePreview={false}
                callbackFunction={(files) => {
                    if (!files.length) {
                        return;
                    }

                    setStatus(WORKING);
                    const [file] = files;

                    uploadFile(file.base64)
                        .then((url) => {
                            if(!url) {
                                Promise.reject();
                            }

                            onChange({url});
                            setStatus(FINISHED);
                        })
                        .catch(() => {
                            setStatus(FAILED);
                        })
                        .finally(() => {
                        });
                }}
                buttonComponent={
                    <div className={"w-100 d-flex align-items-center justify-content-between"}>
                        <IconButton icon={"file-upload"}>
                            Choose Image
                        </IconButton>

                        {data?.url !== null && (
                            <IconButton
                                icon={"trash"}
                                variant={"danger"}
                                onClick={(event) => {
                                    event.stopPropagation();
                                    onChange({url: null});
                                }}
                            >
                                Clear
                            </IconButton>
                        )}
                    </div>
                }
            />
        </FormGroup>
    );
}

export default SingleImage;