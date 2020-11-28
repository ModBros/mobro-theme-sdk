import Container from "mobro/lib/component/container";
import ComponentsBar from "mobro/components/edit/ComponentsBar";
import {getLayout, getSelectedComponent} from "mobro/reducers/layout";
import {moveComponent, removeComponent, selectComponent} from "mobro/actions/layout";

const mapStateToProps = (state) => ({
    layout: getLayout(state),
    selectedComponent: getSelectedComponent(state)
});

const mapDispatchToProps = (dispatch) => ({
    selectComponent: (path) => dispatch(selectComponent({path})),
    removeComponent: (path) => dispatch(removeComponent({path})),
    moveComponent: (sourcePath, destinationPath) => dispatch(moveComponent({sourcePath, destinationPath}))
})

export default Container.create("edit.components-bar", ComponentsBar)
    .basic(false)
    .connect(mapStateToProps, mapDispatchToProps)
    .generate();