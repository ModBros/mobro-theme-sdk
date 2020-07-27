import React from "react";
import {withWrapperHook} from "mobro/utils/hooks";

function App () {
    return (
        <h1>We are awesome!</h1>
    )
}

export default withWrapperHook("app", App);