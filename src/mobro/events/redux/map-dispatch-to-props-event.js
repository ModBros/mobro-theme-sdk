import AbstractEvent from "mobro/events/abstract-event";
import deepmerge from "deepmerge";

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

    getData() {
        return this.getMapDispatchToProps();
    }
}