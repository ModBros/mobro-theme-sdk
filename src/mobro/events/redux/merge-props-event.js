import deepmerge from "deepmerge";
import AbstractEvent from "mobro/events/abstract-event";
import dotPropImmutable from "dot-prop-immutable";

export default class MergePropsEvent extends AbstractEvent {
    mapStateToProps = {};
    mapDispatchToProps = {};
    ownProps = {};

    constructor(mapStateToProps, mapDispatchToProps, ownProps) {
        super();

        this.mapStateToProps = mapStateToProps;
        this.mapDispatchToProps = mapDispatchToProps;
        this.ownProps = ownProps;
    }

    mergeMapStateToProps(mapStateToProps = {}) {
        this.mapStateToProps = deepmerge(this.mapStateToProps, mapStateToProps);
    }

    replaceMapStateToProps(mapStateToProps = {}) {
        this.mapStateToProps = mapStateToProps;
    }

    getMapStateToProps() {
        return this.mapStateToProps;
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

    mergeOwnProps(ownProps = {}) {
        this.ownProps = deepmerge(this.ownProps, ownProps);
    }

    replaceOwnProps(ownProps = {}) {
        this.ownProps = ownProps;
    }

    getOwnProps() {
        return this.ownProps;
    }

    getOwnProp(path) {
        return dotPropImmutable.get(this.getOwnProps(), path);
    }

    getData() {
        return {...this.getMapStateToProps(), ...this.getMapDispatchToProps(), ...this.getOwnProps()};
    }
}