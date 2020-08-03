import React from "react";

// import start file for rendering
import "mobro";

import Text from "mobro/containers/component/Text";
addComponent("text", Text)

// provide the whole public api, react inclusive so themes don't have to
import {provide} from "mobro/utils/public";
import {addComponent} from "mobro/hooks/components-hooks";

window.mobro = provide();
window.React = React;