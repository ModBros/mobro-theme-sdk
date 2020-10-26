import React, {useState} from "react";
import {fetched} from "mobro/utils/communication";
import AlignCenter from "mobro/containers/shared/layout/AlignCenter";
import LoadingIndicator from "mobro/containers/shared/LoadingIndicator";

const defaultLoadingIndicator = (<AlignCenter><LoadingIndicator className="small"/></AlignCenter>);

export function withFetchingIndicator(fetch, fetchingState, loadingIndicator = defaultLoadingIndicator) {
    const [initialized, setInitialized] = useState(false);
    let fetching = false;

    if (!initialized) {
        setInitialized(true);
        fetching = true;
        fetch();
    }

    if (fetching || !fetched(fetchingState)) {
        return loadingIndicator;
    }

    return null;
}