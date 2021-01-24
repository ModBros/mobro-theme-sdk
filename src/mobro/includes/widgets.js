import {addWidget} from "mobro/hooks/components-hooks";

import Text from "mobro/containers/widget/Text";

addWidget({
    name: "text",
    label: "Text",
    component: Text,
    icon: "widget.text",
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

import Image from "mobro/containers/widget/Image";

addWidget({
    name: "image",
    icon: "widget.image",
    label: "Image",
    component: Image,
    config: {
        image: {
            type: "single-image"
        }
    }
});

import BasicValue from "mobro/containers/widget/BasicValue";

addWidget({
    name: "basic-value",
    icon: "widget.data_value",
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

import ValueTable from "mobro/containers/widget/ValueTable";

addWidget({
    name: "value-table",
    icon: "widget.table",
    label: "Value Table",
    component: ValueTable,
    config: {
        label: {
            type: "input"
        },
        components: {
            type: "widgets",
            allowed: ["basic-value"]
        }
    }
});

import Spacer from "mobro/containers/widget/Spacer";

addWidget({
    name: "spacer",
    icon: "widget.spacer",
    label: "Spacer",
    component: Spacer,
    renderConfig: {
        ignoreBaseClassNames: true
    }
})