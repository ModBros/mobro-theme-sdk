import {library} from "@fortawesome/fontawesome-svg-core";
import * as icons from "@fortawesome/free-solid-svg-icons";

const iconList = Object
    .keys(icons)
    .filter(key => key !== "fas" && key !== "prefix")
    .map(icon => icons[icon]);

library.add(...iconList);