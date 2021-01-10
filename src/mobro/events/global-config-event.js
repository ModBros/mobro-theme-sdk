import AbstractEvent from "mobro/events/abstract-event";

export default class GlobalConfigEvent extends AbstractEvent {
    editConfig = {};

    constructor(editConfig = {}) {
        super();

        this.editConfig = editConfig;
    }

    setEditConfig(editConfig) {
        this.editConfig = editConfig;
    }

    addEditComponent(key, config) {
        this.editConfig[key] = config;
    }

    getEditConfig() {
        return this.editConfig;
    }

    getData() {
        return this.editConfig;
    }
}