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
});

import Image from "mobro/containers/component/Image";
addDataComponent("image", Image);

import Background from "mobro/containers/component/Background";
addDataComponent("background", Background);

import BasicValue from "mobro/containers/component/BasicValue";
addDataComponent("basic-value", BasicValue, {
    showLabel: {
        type: "checkbox"
    },

    channel: {
        type: "channel"
    }
});