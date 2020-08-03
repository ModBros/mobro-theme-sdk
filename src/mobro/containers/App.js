import {connect} from "react-redux";
import App from "mobro/components/app";
import {withMapStateToPropsHook} from "mobro/hooks/redux/map-state-to-props-hooks";
import {withMapDispatchToPropsHook} from "mobro/hooks/redux/map-dispatch-to-props-hooks";
import {withMergePropsHook} from "mobro/hooks/redux/merge-props-hook";
import {withWrapper} from "mobro/hooks/components-hooks";
import {fetchLayout} from "mobro/actions/layout";
import {getLayout, getLayoutFetchingState} from "mobro/reducers/layout";

export const componentId = "app";

const mapStateToProps = withMapStateToPropsHook(componentId, event => event.mergeMapStateToProps({
    layoutFetchingState: getLayoutFetchingState(event.getState()),
    layout: getLayout(event.getState())
}));

const mapDispatchToProps = withMapDispatchToPropsHook(componentId, event => event.mergeMapDispatchToProps({
    fetchLayout: () => event.dispatch(fetchLayout())
}));

const mergeProps = withMergePropsHook(componentId);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(withWrapper(componentId, App))