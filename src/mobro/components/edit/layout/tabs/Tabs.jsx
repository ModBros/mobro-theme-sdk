import {useState} from "react";
import {first, map} from "mobro/utils/helper";

function Navigation(props) {
    const {
        setCurrentTab,
        tabs,
        currentTab
    } = props;

    return (
        <ul className={`nav nav-tabs`}>
            {map(tabs, (tab, i) => (
                <li className={`nav-item`} key={i}>
                    <button
                        type="button"
                        className={`nav-link ${tab.key === currentTab.key ? "active" : ""}`}
                        onClick={() => setCurrentTab(tab)}
                    >
                        {tab.props.label}
                    </button>
                </li>
            ))}
        </ul>
    );
}

function Tabs(props) {
    const {
        children,
        NavigationComponent = Navigation,
        ...rest
    } = props;

    const [currentTab, setCurrentTab] = useState(first(children));

    return (
        <div {...rest}>
            <NavigationComponent setCurrentTab={setCurrentTab} tabs={children} currentTab={currentTab}/>

            <div className={"tab-content"}>
                <div className={"tab-pane active"} role={"tabpanel"}>
                    {map(children, (child) => {
                        if (child.key === currentTab.key) {
                            return child.props.children;
                        }
                    })}
                </div>
            </div>
        </div>
    );
}

export default Tabs;