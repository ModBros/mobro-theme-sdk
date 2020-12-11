import {addDataComponent} from "mobro/hooks/components-hooks";

import Text from "mobro/containers/component/Text";

addDataComponent({
    name: "text",
    label: "Text",
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
    label: "Image",
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
    label: "Basic Value",
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
    label: "Value Table",
    component: ValueTable,
    config: {
        label: {
            type: "input"
        },
        components: {
            type: "components",
            allowed: ["basic-value"]
        }
    }
});

import Spacer from "mobro/containers/component/Spacer";

addDataComponent({
    name: "spacer",
    label: "Spacer",
    component: Spacer,
    renderConfig: {
        ignoreBaseClassNames: true
    }
})