import {connect} from "react-redux";
import App from "mobro/components/app";
import {
    nooohook, omhook,
    withMapDispatchToPropsHook,
    withMapStateToPropsHook,
    withMergePropsHook,
    withWrapperHook
} from "mobro/utils/hooks";

export const HOOK = "app";

const mapStateToProps = withMapStateToPropsHook(HOOK, nooohook);
const mapDispatchToProps = withMapDispatchToPropsHook(HOOK, nooohook);
const mergeProps = withMergePropsHook(HOOK, omhook);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(withWrapperHook(HOOK, App))