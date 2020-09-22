import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {createStore} from "mobro/reducers";
import {registerPublicEndpoint} from "mobro/utils/public";
import App from "mobro/containers/app";

import "mobro/styles/vendor.scss"
import "mobro/styles/bootstrap.scss"
import "mobro/styles/sdk.scss";

registerPublicEndpoint("init", () => {
    const store = createStore();
    const $app = document.getElementById("mobro");

    const dom = (
        <Provider store={store}>
            <App/>
        </Provider>
    );

    ReactDOM.render(dom, $app);
});