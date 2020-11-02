import Container from "mobro/lib/component/container";
import Footer from "mobro/components/edit/Footer";
import {removeComponent} from "mobro/actions/layout";

/**
 * @param {MapDispatchToPropsEvent} event
 */
const mapDispatchToProps = event => event.mergeMapDispatchToProps({
    removeComponent: () => event.dispatch(removeComponent({path: event.getOwnProp("path")}))
});

export default Container.create("edit.footer", Footer)
    .redux(null, mapDispatchToProps)
    .generate();