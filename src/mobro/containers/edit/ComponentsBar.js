import Container from "mobro/lib/component/container";
import ComponentsBar from "mobro/components/edit/ComponentsBar";
import {getLayout, getSelectedComponent} from "mobro/reducers/layout";
import {removeComponent, selectComponent} from "mobro/actions/layout";

/**
 * @param {MapStateToPropsEvent} event
 */
const mapStateToProps = event => event.mergeMapStateToProps({
    layout: getLayout(event.getState()),
    selectedComponent: getSelectedComponent(event.getState())
});

/**
 * @param {MapDispatchToPropsEvent} event
 */
const mapDispatchToProps = event => event.mergeMapDispatchToProps({
    selectComponent: (path) => event.dispatch(selectComponent({path})),
    removeComponent: (path) => event.dispatch(removeComponent({path}))
})

export default Container.create("edit.components-bar", ComponentsBar)
    .redux(mapStateToProps, mapDispatchToProps)
    .generate();