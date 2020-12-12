import Container from "mobro/lib/component/container";
import Channel from "mobro/components/edit/data/Channel";
import {
    getHardwareTypesBySource,
    getSensorDataBySourceAndHardwareType,
    getSensorDataFetchingState,
    getSensorSources
} from "mobro/reducers/sensors";
import {fetchSensorData} from "mobro/actions/sensors";

const mapStateToProps = (state, ownProps) => ({
    sensorDataFetchingState: getSensorDataFetchingState(state),
    sources: getSensorSources(state),
    hardwareTypes: getHardwareTypesBySource(state, ownProps?.data?.source),
    sensors: getSensorDataBySourceAndHardwareType()(state, ownProps?.data?.source, ownProps?.data?.hardwaretype)
});

const mapDispatchToProps = (dispatch) => ({
    fetchSensorData: () => dispatch(fetchSensorData())
});

export default Container.create("edit.data.channel", Channel)
    .basic(false)
    .connect(mapStateToProps, mapDispatchToProps)
    .generate();