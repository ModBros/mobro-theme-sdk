import Grid from "mobro/containers/grid/Grid";

function Entry({layout}) {
    return (
        <Grid components={layout.components} height={layout.height}/>
    );
}

export default Entry;