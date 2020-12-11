import {Component} from "react";
import {connect} from "react-redux";
import {addComponent, withWrapper} from "mobro/hooks/components-hooks";
import {withMapStateToPropsHook} from "mobro/hooks/redux/map-state-to-props-hooks";
import {withMapDispatchToPropsHook} from "mobro/hooks/redux/map-dispatch-to-props-hooks";
import {withMergePropsHook} from "mobro/hooks/redux/merge-props-hook";
import {registerPublicEndpoint} from "mobro/utils/public";

export default class Container {
    id = null;
    component = null;

    basicEnabled = true;

    reduxEnabled = false;
    basicReduxEnabled = false;
    mapStateToProps = null;
    mapDispatchToProps = null;
    mergeProps = null;

    static create(id, component) {
        return new Container(id, component);
    }

    /**
     * @param {string} id
     * @param {Component|function} component
     */
    constructor(id, component) {
        this.id = id;
        this.component = component;
    }

    /**
     * @returns {string}
     */
    getId() {
        return this.id;
    }

    /**
     * @returns {Component|function}
     */
    getComponent() {
        return this.component;
    }

    /**
     * @returns {this}
     */
    basic(enabled = true) {
        this.basicEnabled = enabled;

        return this;
    }

    /**
     * @param {function|null} mapStateToProps
     * @param {function|null} mapDispatchToProps
     * @param {function|null} mergeProps
     *
     * @returns {this}
     */
    redux(mapStateToProps = null, mapDispatchToProps = null, mergeProps = null) {
        this.reduxEnabled = true;
        this.basicReduxEnabled = false;

        this.mapStateToProps = mapStateToProps;
        this.mapDispatchToProps = mapDispatchToProps;
        this.mergeProps = mergeProps;

        return this;
    }

    /**
     * @param {function|null} mapStateToProps
     * @param {function|null} mapDispatchToProps
     * @param {function|null} mergeProps
     *
     * @returns {this}
     */
    connect(mapStateToProps = null, mapDispatchToProps = null, mergeProps = null) {
        this.basicReduxEnabled = true;
        this.reduxEnabled = false;

        this.mapStateToProps = mapStateToProps;
        this.mapDispatchToProps = mapDispatchToProps;
        this.mergeProps = mergeProps;

        return this;
    }

    /**
     * @private
     * @returns {this}
     */
    _basic() {
        addComponent(this.id, this.component);

        if (this.basicEnabled) {
            this.component = withWrapper(this.id, this.component);
        }

        return this;
    }

    /**
     * @private
     * @return {this}
     */
    _redux() {
        if (this.reduxEnabled) {
            const mapStateToProps = withMapStateToPropsHook(this.id, this.mapStateToProps);
            const mapDispatchToProps = withMapDispatchToPropsHook(this.id, this.mapDispatchToProps);
            const mergeProps = withMergePropsHook(this.id, this.mergeProps);

            this.component = connect(mapStateToProps, mapDispatchToProps, mergeProps)(this.component);
        } else if (this.basicReduxEnabled) {
            this.component = connect(this.mapStateToProps, this.mapDispatchToProps, this.mergeProps)(this.component);
        }

        return this;
    }

    /**
     * @return {Component|function}
     */
    generate() {
        this
            ._basic()
            ._redux();

        return this.component;
    }
}

registerPublicEndpoint("lib.component.container", Container);