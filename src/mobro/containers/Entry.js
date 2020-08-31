import Container from "mobro/lib/component/container";
import Entry from "mobro/components/Entry";
import {getLayout} from "mobro/reducers/layout";

const mapStateToProps = event => event.mergeMapStateToProps({
    layout: getLayout(event.getState())
});

export default Container.create("entry", Entry)
    .redux(mapStateToProps)
    .generate();