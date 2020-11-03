import Container from "mobro/lib/component/container";
import ValueTable from "mobro/components/component/ValueTable";

export default Container.create("component.value-table", ValueTable)
    .redux()
    .generate();