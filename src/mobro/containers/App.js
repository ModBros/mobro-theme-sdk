import {fetchLayout, layoutMode} from "mobro/actions/layout";
import {getEditmode, getLayout, getLayoutConfig, getLayoutFetchingState, getLayoutMode} from "mobro/reducers/layout";
import App from "mobro/components/App";
import Container from "mobro/lib/component/container";
import {getSettings, getSettingsFetchingState} from "mobro/reducers/settings";
import {fetchSettings} from "mobro/actions/settings";

const mapStateToProps = (state) => ({
    layoutFetchingState: getLayoutFetchingState(state),
    layout: getLayout(state),
    layoutMode: getLayoutMode(state),
    settingsFetchingState: getSettingsFetchingState(state),
    settings: getSettings(state),
    config: getLayoutConfig(state),
    editmode: getEditmode(state)
});

const mapDispatchToProps = (dispatch) => ({
    fetchLayout: () => dispatch(fetchLayout()),
    fetchSettings: () => dispatch(fetchSettings()),
    setLayoutMode: (mode) => dispatch(layoutMode(mode))
});

export default Container.create("app", App)
    .basic(false)
    .connect(mapStateToProps, mapDispatchToProps)
    .generate();