import {addDataComponent} from "mobro/hooks/components-hooks";

import Text from "mobro/containers/component/Text";

addDataComponent("text", Text, {
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
}, {
    align: "left"
});

import Image from "mobro/containers/component/Image";

addDataComponent("image", Image, {
    image: {
        type: "single-image"
    }
});

import BasicValue from "mobro/containers/component/BasicValue";

addDataComponent("basic-value", BasicValue, {
    showLabel: {
        type: "checkbox"
    },

    channel: {
        type: "channel"
    }
}, {
    showLabel: true
});

import ValueTable from "mobro/containers/component/ValueTable";

addDataComponent("value-table", ValueTable, {
    values: {
        type: "repeat",
        fields: {
            channel: {
                type: "channel"
            }
        }
    }
});

import BasicChart from "mobro/containers/component/BasicChart";

addDataComponent("basic-chart", BasicChart, {
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
});

import Spacer from "mobro/containers/component/Spacer";

addDataComponent("spacer", Spacer, {}, {}, {
    ignoreBaseClassNames: true
})