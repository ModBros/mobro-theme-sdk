import {send} from "mobro/utils/communication";
import {UPLOAD_FILE} from "mobro/enum/endpoints";

export function uploadFile(base64) {
    return send(UPLOAD_FILE, {
        file: base64
    });
}