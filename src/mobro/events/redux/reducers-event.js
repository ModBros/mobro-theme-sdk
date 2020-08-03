import deepmerge from "deepmerge";
import AbstractEvent from "mobro/events/abstract-event";

export default class ReducersEvent extends AbstractEvent {
    doCreateReducer = null;
    doCombineReducers = null;
    reducers = {}

    constructor(createReducer, combineReducers, reducers = {}) {
        super();

        this.doCreateReducer = createReducer;
        this.doCombineReducers = combineReducers;
        this.reducers = reducers;
    }

    createReducer(...args) {
        return this.doCreateReducer(...args);
    }

    combineReducers(...args) {
        return this.doCombineReducers(...args);
    }

    mergeReducers(reducers = {}) {
        this.reducers = deepmerge(this.reducers, reducers);
    }

    getData() {
        return this.combineReducers(this.reducers);
    }
}