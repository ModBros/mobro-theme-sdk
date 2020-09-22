import AbstractEvent from "mobro/events/abstract-event";
import deepmerge from "deepmerge";
import dotPropImmutable from "dot-prop-immutable";

export default class MapDispatchToPropsEvent extends AbstractEvent {
    doDispatch = null;
    ownProps = {};
    mapDispatchToProps = {};

    constructor(dispatch, ownProps) {
        super();

        this.doDispatch = dispatch;
        this.ownProps = ownProps;
    }

    mergeMapDispatchToProps(mapDispatchToProps = {}) {
        this.mapDispatchToProps = deepmerge(this.mapDispatchToProps, mapDispatchToProps);
    }

    replaceMapDispatchToProps(mapDispatchToProps = {}) {
        this.mapDispatchToProps = mapDispatchToProps;
    }

    getMapDispatchToProps() {
        return this.mapDispatchToProps;
    }

    dispatch(...args) {
        return this.doDispatch(...args);
    }

    getOwnProps() {
        return this.ownProps;
    }

    getOwnProp(path) {
        return dotPropImmutable.get(this.getOwnProps(), path);
    }

    getData() {
        return this.getMapDispatchToProps();
    }
}