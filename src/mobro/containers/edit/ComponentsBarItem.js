import Container from "mobro/lib/component/container";
import {getLayout, getSelectedComponent} from "mobro/reducers/layout";
import {duplicateComponent, moveComponent, removeComponent, selectComponent} from "mobro/actions/layout";
import ComponentsBarItem from "mobro/components/edit/ComponentsBarItem";

const mapStateToProps = (state) => ({
    selectedComponent: getSelectedComponent(state)
});

const mapDispatchToProps = (dispatch) => ({
    selectComponent: (path) => dispatch(selectComponent({path})),
    removeComponent: (path) => dispatch(removeComponent({path})),
    moveComponent: (sourcePath, destinationPath) => dispatch(moveComponent({sourcePath, destinationPath})),
    duplicateComponent: (type, config) => dispatch(duplicateComponent({type, config}))
})

export default Container.create("edit.components-bar-item", ComponentsBarItem)
    .basic(false)
    .connect(mapStateToProps, mapDispatchToProps)
    .generate();