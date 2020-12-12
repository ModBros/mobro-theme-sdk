import {registerPublicEndpoint} from "mobro/utils/public";
import {useEffect, useState} from "react";
import {getPublicUploadUrl, getPublicUrl} from "mobro/utils/socket";

export function withPublicUrl(asset) {
    const [url, setUrl] = useState(null);

    useEffect(() => {
        // check for upload file first
        fileExistsOnServer(getPublicUploadUrl(asset))
            .then((exists) => {
                if (exists) {
                    setUrl(getPublicUploadUrl(asset));
                    return new Promise(resolve => resolve(false));
                } else {
                    return fileExistsOnServer(getPublicUrl(asset));
                }
            })
            .then((exists) => {
                if (exists) {
                    setUrl(getPublicUrl(asset));
                    return new Promise(resolve => resolve(false));
                }
            });
    }, [asset]);

    return url;
}

registerPublicEndpoint("utils.http.withPublicUrl", withPublicUrl);

export async function fileExistsOnServer(url) {
    try {
        await fetch(url);

        // 200 file exists
        return true;
    } catch (exception) {
        // error like 404, file does not exist
        return false;
    }
}

registerPublicEndpoint("utils.http.fileExistsOnServer", fileExistsOnServer);
