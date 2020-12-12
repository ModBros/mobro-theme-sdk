import {registerPublicEndpoint} from "mobro/utils/public";
import {empty} from "mobro/utils/helper";

const _library = {};
const _aliases = {};

function getNameByAlias(alias) {
    return _aliases[alias];
}

export function addIcon(name, svg) {
    _library[name] = svg;
    _aliases[name] = name;
}

registerPublicEndpoint("utils.icons.addIcon", addIcon);

export function getIcon(name) {
    return _library[getNameByAlias(name)];
}

registerPublicEndpoint("utils.icons.getIcon", getIcon);

export function hasIcon(name) {
    return !empty(getIcon(name));
}

registerPublicEndpoint("utils.icons.hasIcon", hasIcon);