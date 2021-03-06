import Container from "mobro/lib/component/container";
import ValueTable from "mobro/components/widget/ValueTable";
import {getSelectedComponent} from "mobro/reducers/layout";

const mapStateToProps = (event) => event.mergeMapStateToProps({
    selectedComponent: getSelectedComponent(event.getState())
});

export default Container.create("widget.value-table", ValueTable)
    .redux(mapStateToProps)
    .generate();