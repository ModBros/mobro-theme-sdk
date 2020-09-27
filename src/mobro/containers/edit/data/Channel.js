import Container from "mobro/lib/component/container";
import Channel from "mobro/components/edit/data/Channel";
import MapStateToPropsEvent from "mobro/events/redux/map-state-to-prop-event";
import MapDispatchToPropsEvent from "mobro/events/redux/map-dispatch-to-props-event";
import {getSensorDataBySourceAndHardwareType, getSensorDataFetchingState} from "mobro/reducers/sensors";
import {fetchSensorData} from "mobro/actions/sensors";

/**
 * @param {MapStateToPropsEvent} event
 */
const mapStateToProps = (event) => event.mergeMapStateToProps({
    sensorDataFetchingState: getSensorDataFetchingState(event.getState()),
    sensorData: getSensorDataBySourceAndHardwareType()(event.getState(), event.getOwnProp("data.source"), event.getOwnProp("data.hardwaretype"))
});

/**
 * @param {MapDispatchToPropsEvent} event
 */
const mapDispatchToProps = (event) => event.mergeMapDispatchToProps({
    fetchSensorData: () => event.dispatch(fetchSensorData())
});

export default Container.create("edit.data.channel", Channel)
    .redux(mapStateToProps, mapDispatchToProps)
    .generate();