import {library} from "@fortawesome/fontawesome-svg-core";
import * as icons from "@fortawesome/free-solid-svg-icons";
import {addIcon, addIconAlias} from "mobro/utils/icons";

// font awesome library

const iconList = Object
    .keys(icons)
    .filter(key => key !== "fas" && key !== "prefix")
    .map(icon => icons[icon]);

library.add(...iconList);

// custom icons todo replace later with better implementation

// widgets

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

// data sources

import HardwareMonitorIcon from "mobro/icons/sources/hardware_monitor.svg";
addIcon("data_source.hardware_monitor", HardwareMonitorIcon);
addIconAlias("option_openhardwaremonitor", "data_source.hardware_monitor");
addIconAlias("option_librehardwaremonitor", "data_source.hardware_monitor");

import HWInfoIcon from "mobro/icons/sources/hwinfo.svg";
addIcon("data_source.hwinfo", HWInfoIcon);
addIconAlias("option_hwinfo", "data_source.hwinfo");

import Aida64Icon from "mobro/icons/sources/aida64.svg";
addIcon("data_source.aida64", Aida64Icon);
addIconAlias("option_aida64", "data_source.aida64");

// data categories

import BatteryIcon from "mobro/icons/data_categories/battery.svg";
addIcon("data_category.battery", BatteryIcon);
addIconAlias("option_Battery", "data_category.battery");

import CpuIcon from "mobro/icons/data_categories/cpu.svg";
addIcon("data_category.cpu", CpuIcon);
addIconAlias("option_Processor", "data_category.cpu");

import GpuIcon from "mobro/icons/data_categories/gpu.svg";
addIcon("data_category.gpu", GpuIcon);
addIconAlias("option_Graphics", "data_category.gpu");

import MemoryIcon from "mobro/icons/data_categories/memory.svg";
addIcon("data_category.memory", MemoryIcon);
addIconAlias("option_Memory", "data_category.memory");

import MiscIcon from "mobro/icons/data_categories/misc.svg";
addIcon("data_category.misc", MiscIcon);
addIconAlias("option_Misc", "data_category.misc");
addIconAlias("misc", "data_category.misc");

import NetworkIcon from "mobro/icons/data_categories/network.svg";
addIcon("data_category.network", NetworkIcon);
addIconAlias("option_Network", "data_category.network");

import StorageIcon from "mobro/icons/data_categories/storage.svg";
addIcon("data_category.storage", StorageIcon);
addIconAlias("option_Storage", "data_category.storage");

import MainboardIcon from "mobro/icons/data_categories/mainboard.svg";
addIcon("data_category.mainboard", MainboardIcon);
addIconAlias("option_Mainboard", "data_category.mainboard");