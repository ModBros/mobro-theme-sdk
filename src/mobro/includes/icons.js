import {library} from "@fortawesome/fontawesome-svg-core";
import * as icons from "@fortawesome/free-solid-svg-icons";
import {addIcon} from "mobro/utils/icons";

// font awesome library

const iconList = Object
    .keys(icons)
    .filter(key => key !== "fas" && key !== "prefix")
    .map(icon => icons[icon]);

library.add(...iconList);

// custom icons todo replace later with better implementation

import WidgetTextIcon from "mobro/icons/widgets/text.svg";
addIcon("widget.text", WidgetTextIcon);

import WidgetTableIcon from "mobro/icons/widgets/table.svg";
addIcon("widget.table", WidgetTableIcon);

import WidgetDataValueIcon from "mobro/icons/widgets/data_value.svg";
addIcon("widget.data_value", WidgetDataValueIcon);

import WidgetImageIcon from "mobro/icons/widgets/image.svg";
addIcon("widget.image", WidgetImageIcon);

import WidgetSpacerIcon from "mobro/icons/widgets/spacer.svg";
addIcon("widget.spacer", WidgetSpacerIcon);