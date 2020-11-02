import Container from "mobro/lib/component/container";
import MapStateToPropsEvent from "mobro/events/redux/map-state-to-prop-event";
import {getLayout, getLayoutMode} from "mobro/reducers/layout";
import TriggerGlobalConfigButton from "mobro/components/edit/data/TriggerGlobalConfigButton";

/**
 * @param {MapStateToPropsEvent} event
 */
const mapStateToProps = event => {
    const layout = getLayout(event.getState());

    event.mergeMapStateToProps({
        layoutMode: getLayoutMode(event.getState()),
        data: {
            width: layout?.width,
            height: layout?.height,
            ...layout?.data
        }
    });
}

export default Container.create("edit.trigger-global-config-button", TriggerGlobalConfigButton)
    .redux(mapStateToProps)
    .generate();