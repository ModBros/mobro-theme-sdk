import {addEditComponent, addLayoutComponent} from "mobro/hooks/components-hooks";

import Fieldset from "mobro/containers/edit/layout/Fieldset";

addLayoutComponent({
    name: "fieldset",
    component: Fieldset
});

import FieldContainer from "mobro/containers/edit/layout/FieldContainer";

addLayoutComponent({
    name: "field-container",
    component: FieldContainer
});

import Input from "mobro/containers/edit/data/Input";

addEditComponent({
    name: "input",
    component: Input,
    defaultValue: ""
});

import Numeric from "mobro/containers/edit/data/Numeric";

addEditComponent({
    name: "numeric",
    component: Numeric,
    defaultValue: ""
});

import Select from "mobro/containers/edit/data/Select";

addEditComponent({
    name: "select",
    component: Select,
    defaultValue: null
});

import Checkbox from "mobro/containers/edit/data/Checkbox";

addEditComponent({
    name: "checkbox",
    component: Checkbox,
    defaultValue: false
});

import Channel from "mobro/containers/edit/data/Channel";

addEditComponent({
    name: "channel",
    component: Channel,
    defaultValue: {
        source: null,
        hardwaretype: null,
        id: null
    }
});

import SingleImage from "mobro/containers/edit/data/SingleImage";

addEditComponent({
    name: "single-image",
    component: SingleImage,
    defaultValue: ""
});

import Color from "mobro/containers/edit/data/Color";
import {defaultColorValue} from "mobro/components/edit/data/Color";

addEditComponent({
    name: "color",
    component: Color,
    defaultValue: defaultColorValue
});

import Repeat from "mobro/containers/edit/data/Repeat";

addEditComponent({
    name: "repeat",
    component: Repeat,
    defaultValue: []
});

import Components from "mobro/containers/edit/data/Components";

addEditComponent({
    name: "components",
    component: Components,
    defaultValue: {
        components: []
    }
});