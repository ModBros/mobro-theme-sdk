import Grid from "mobro/containers/grid/Grid";
import {getComponentsFromConfig} from "mobro/utils/component";

function Entry({layout}) {
    return (
        <Grid components={getComponentsFromConfig(layout)}/>
    );
}

export default Entry;