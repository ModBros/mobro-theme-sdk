import React, {Fragment} from "react";
import {empty, map} from "mobro/utils/helper";
import AlignCenter from "mobro/containers/shared/layout/AlignCenter";
import ComponentsBarItem from "mobro/containers/edit/ComponentsBarItem";

function ComponentsBar(props) {
    const {
        path = "",
        components = [],
    } = props;

    if (empty(components)) {
        return (
            <AlignCenter>
                <h5 className={"text-white"}>No Components yet, add one!</h5>
            </AlignCenter>
        );
    }

    return (
        <Fragment>
            {map(components, (component, i) => (
                <ComponentsBarItem
                    key={i}
                    index={i}
                    component={component}
                    path={path}
                    componentsCount={components.length}
                />
            ))}
        </Fragment>
    )
}

export default ComponentsBar;