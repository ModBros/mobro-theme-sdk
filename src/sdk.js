import React from "react";
import ReactDOM from "react-dom";

// import start file for rendering
import "mobro";

// includes
import "mobro/includes/icons";
import "mobro/includes/edit";
import "mobro/includes/components";
import "mobro/includes/autoimport";

// provide the whole public api, react inclusive so themes don't have to
import {provide} from "mobro/utils/public";
import {getSocket} from "mobro/utils/socket";

// init socket
getSocket();

window.mobro = provide();
window.React = React;
window.ReactDOM = ReactDOM;