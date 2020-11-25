import {addDataComponent} from "mobro/hooks/components-hooks";

import Text from "mobro/containers/component/Text";

addDataComponent({
    name: "text",
    component: Text,
    config: {
        text: {
            type: "input"
        },

        align: {
            type: "select",
            options: [
                {label: "Left", value: "left"},
                {label: "Center", value: "center"},
                {label: "Right", value: "right"},
            ]
        }
    },
    defaultValues: {
        align: "left"
    }
});

import Image from "mobro/containers/component/Image";

addDataComponent({
    name: "image",
    component: Image,
    config: {
        image: {
            type: "single-image"
        }
    }
});

import BasicValue from "mobro/containers/component/BasicValue";

addDataComponent({
    name: "basic-value",
    component: BasicValue,
    config: {
        showLabel: {
            type: "checkbox"
        },

        channel: {
            type: "channel"
        }
    },
    defaultValues: {
        showLabel: true
    }
});

import ValueTable from "mobro/containers/component/ValueTable";

addDataComponent({
    name: "value-table",
    component: ValueTable,
    config: {
        components: {
            type: "components",
            allowed: ["basic-value"]
        }
    }
});

import BasicChart from "mobro/containers/component/BasicChart";

addDataComponent({
    name: "basic-chart",
    component: BasicChart,
    config: {
        showLabel: {
            type: "checkbox"
        },
        customLabel: {
            type: "input"
        },
        displayType: {
            type: "select",
            options: [
                {label: "Line", value: "line"},
                {label: "Area", value: "area"},
                {label: "Pie", value: "pie"}
            ]
        },
        channel: {
            type: "channel"
        }
    }
});

import Spacer from "mobro/containers/component/Spacer";

addDataComponent({
    name: "spacer",
    component: Spacer,
    renderConfig: {
        ignoreBaseClassNames: true
    }
})