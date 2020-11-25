import Container from "mobro/lib/component/container";
import MapStateToPropsEvent from "mobro/events/redux/map-state-to-prop-event";
import {getLayoutMode} from "mobro/reducers/layout";
import AddComponentButton from "mobro/components/edit/AddComponentButton";
import {addComponent} from "mobro/actions/layout";

const mapStateToProps = (state) => ({
    layoutMode: getLayoutMode(state)
});

const mapDispatchToProps = (dispatch) => ({
    addComponent: (args) => dispatch(addComponent(args))
})

export default Container.create("edit.trigger-edit-button", AddComponentButton)
    .basic(false)
    .connect(mapStateToProps, mapDispatchToProps)
    .generate();