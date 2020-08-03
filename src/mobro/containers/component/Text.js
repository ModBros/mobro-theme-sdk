import {connect} from "react-redux";
import Text from "mobro/components/component/Text";
import {withMapStateToPropsHook} from "mobro/hooks/redux/map-state-to-props-hooks";
import {withMapDispatchToPropsHook} from "mobro/hooks/redux/map-dispatch-to-props-hooks";
import {withMergePropsHook} from "mobro/hooks/redux/merge-props-hook";
import {withWrapper} from "mobro/hooks/components-hooks";

export const componentId = "component.text";

const mapStateToProps = withMapStateToPropsHook(componentId);
const mapDispatchToProps = withMapDispatchToPropsHook(componentId);
const mergeProps = withMergePropsHook(componentId);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(withWrapper(componentId, Text))