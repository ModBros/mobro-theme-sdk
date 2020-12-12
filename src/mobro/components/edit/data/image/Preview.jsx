import {getPublicUploadUrl} from "mobro/utils/socket";

function Preview(props) {
    const {
        url
    } = props;

    if(!url) {
        return null;
    }

    return (
        <div>
            <img className={"img-fluid"} src={getPublicUploadUrl(url)}/>
        </div>
    )
}

export default Preview;