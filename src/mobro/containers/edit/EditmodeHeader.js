import Container from "mobro/lib/component/container";
import EditmodeHeader from "mobro/components/edit/EditmodeHeader";
import {adaptToDeviceResolution, layoutEdit, setZoomLevel} from "mobro/actions/layout";
import {getLayoutConfig, getLayoutMode, getZoomLevel} from 'mobro/reducers/layout'

const mapStateToProps = (state) => ({
    layoutConfig: getLayoutConfig(state),
    zoomLevel: getZoomLevel(state),
    layoutMode: getLayoutMode(state)
});

const mapDispatchToProps = (dispatch) => ({
    layoutEdit: ({name, data}) => dispatch(layoutEdit({path: "", name, data})),
    setZoomLevel: (zoomLevel) => dispatch(setZoomLevel(zoomLevel))
});

export default Container.create("edit.editmode-header", EditmodeHeader)
    .basic(false)
    .connect(mapStateToProps, mapDispatchToProps)
    .generate();