import {addEditComponent} from "mobro/hooks/components-hooks";

import Input from "mobro/containers/edit/data/Input";
addEditComponent("input", Input, "");

import Numeric from "mobro/containers/edit/data/Numeric";
addEditComponent("numeric", Numeric, "");

import Select from "mobro/containers/edit/data/Select";
addEditComponent("select", Select, null);

import Checkbox from "mobro/containers/edit/data/Checkbox";
addEditComponent("checkbox", Checkbox, false);

import Channel from "mobro/containers/edit/data/Channel";
addEditComponent("channel", Channel, {
    source: null,
    hardwaretype: null,
    id: null
});

import SingleImage from "mobro/containers/edit/data/SingleImage";
addEditComponent("single-image", SingleImage, null)