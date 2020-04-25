export default class Helper {
    settings = {};

    constructor(settings) {
        this.settings = settings;
    }

    isPercentageData(data) {
        return data.unit && data.unit === "%";
    }

    getValueByPath(data, path) {
        const parts = path.split(".");

        for(let i = 0; i < parts.length; i++) {
            let part = parts[i];

            if(!data || typeof(data) !== "object") {
                return null;
            }

            data = data[part];
        }
    }

    isTemperatureData(data) {
        return this.getValueByPath(data, "_config.sensortype") === "Temperature";
    }

    mapTemperatureValue(data) {
        if (!data) {
            return null;
        }

        if (typeof(data) === "number") {
            data = {value: data, unit: null};
        }

        if (this.settings.temperatureAsFahrenheit && data.unit !== "F") {
            return Math.round((data.value * (9 / 5)) + 32);
        }

        return data.value;
    }

    getTemperatureConfig(data) {
        const hardwareType = this.getValueByPath(data, "_config.hardwaretype");
        const temperatures = this.getValueByPath(this.settings, "settings.hardware.temperature") || [];

        return temperatures.find((config) => {
            return config.hardwaretype === hardwareType;
        });
    }

    getMaxValue(data) {
        if (!data) {
            return null;
        }

        if (this.isPercentageData(data)) {
            return 100;
        }

        if (this.isTemperatureData(data)) {
            const config = this.getTemperatureConfig(data);

            if (config) {
                return config.max;
            }

            return null;
        }

        return data.max;
    }

    formatValue(data, fixate = true) {
        if (!data) {
            return null;
        }

        let value = data.value;

        if (typeOf(value) !== "number" || !fixate) {
            return value;
        }

        let fixed = 0;

        if (this.isTemperatureData(data)) {
            value = this.mapTemperatureValue(data);
        }

        if (!this.isPercentageData(data) && value % 1 !== 0) {
            fixed = 1;
        }

        return value.toFixed(fixed);
    }
};