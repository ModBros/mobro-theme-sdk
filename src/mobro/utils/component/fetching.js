import React, {useEffect} from "react";
import {fetched} from "mobro/utils/communication";
import AlignCenter from "mobro/containers/shared/layout/AlignCenter";
import LoadingIndicator from "mobro/containers/shared/LoadingIndicator";

const defaultLoadingIndicator = (<AlignCenter><LoadingIndicator className="small"/></AlignCenter>);

export function withFetchingIndicator(fetch, fetchingState, loadingIndicator = defaultLoadingIndicator) {
    let fetching = false;

    useEffect(() => {
        fetching = true;
        fetch();
    }, [])

    if (fetching || !fetched(fetchingState)) {
        return loadingIndicator;
    }

    return null;
}