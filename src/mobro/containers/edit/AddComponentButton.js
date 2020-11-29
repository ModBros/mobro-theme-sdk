import Container from "mobro/lib/component/container";
import {getLayoutComponentTemporaryStorage, getLayoutMode} from "mobro/reducers/layout";
import AddComponentButton from "mobro/components/edit/AddComponentButton";
import {addComponent, pasteComponent} from "mobro/actions/layout";

const mapStateToProps = (state) => ({
    layoutMode: getLayoutMode(state),
    canPasteComponent: !!getLayoutComponentTemporaryStorage(state)
});

const mapDispatchToProps = (dispatch) => ({
    addComponent: (args) => dispatch(addComponent(args)),
    pasteComponent: (path) => dispatch(pasteComponent({path}))
})

export default Container.create("edit.trigger-edit-button", AddComponentButton)
    .basic(false)
    .connect(mapStateToProps, mapDispatchToProps)
    .generate();