import React from "react";

// import start file for rendering
import "mobro";

// includes
import "mobro/includes/icons";
import "mobro/includes/edit";
import "mobro/includes/components";

// provide the whole public api, react inclusive so themes don't have to
import {provide} from "mobro/utils/public";

window.mobro = provide();
window.React = React;