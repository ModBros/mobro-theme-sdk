import {getDataComponents} from "mobro/hooks/components-hooks";
import {map} from "mobro/utils/helper";

function ComponentSelection({onSelect}) {
    const components = getDataComponents();

    return (
        <div className={"row row-gutter-1"}>
            {map(Object.keys(components), (component) => (
                <div key={component} className={"col-4 d-flex"}>
                    <div className="card card-clickable mb-2 w-100" onClick={() => onSelect(component)}>
                        <div className="card-body p-2 d-flex align-items-center">
                            <h6 className="m-0 text-uppercase w-100 text-center">
                                {component}
                            </h6>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ComponentSelection;