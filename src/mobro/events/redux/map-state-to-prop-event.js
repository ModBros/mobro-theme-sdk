import AbstractEvent from "mobro/events/abstract-event";
import deepmerge from "deepmerge";

export default class MapStateToPropsEvent extends AbstractEvent {
    state = {};
    ownProps = {};
    mapStateToProps = {};

    constructor(state, ownProps) {
        super();

        this.state = state;
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

    getState() {
        return this.state;
    }

    getOwnProps() {
        return this.ownProps;
    }

    getData() {
        return this.getMapStateToProps();
    }
}