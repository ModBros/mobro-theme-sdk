import React from "react";

// import start file for rendering
import "mobro";

// import files for public api
import "mobro/utils/hooks";

// provide the whole public api, react inclusive so themes don't have to
import {provide} from "mobro/utils/public";
window.mobro = provide();
window.React = React;