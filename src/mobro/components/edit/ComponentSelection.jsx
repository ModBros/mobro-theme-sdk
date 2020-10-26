import {getDataComponents} from "mobro/hooks/components-hooks";

function ComponentSelection({onSelect}) {
    const components = getDataComponents();

    return Object.keys(components).map((component) => (
        <div key={component} className="card card-clickable mb-2" onClick={() => onSelect(component)}>
            <div className="card-body py-2 px-3">
                <h6 className="m-0 text-uppercase">
                    {component}
                </h6>
            </div>
        </div>
    ))
}

export default ComponentSelection;