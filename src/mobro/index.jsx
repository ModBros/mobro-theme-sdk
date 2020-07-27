import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {createStore} from "redux";
import reducers from "mobro/reducers";
import App from "mobro/containers/app";
import {registerPublicEndpoint} from "mobro/utils/public";
import "mobro/styles/sdk.scss";

registerPublicEndpoint("init", () => {
    const store = createStore(reducers);
    const $app = document.getElementById("mobro");

    const dom = (
        <Provider store={store}>
            <App/>
        </Provider>
    );

    ReactDOM.render(dom, $app);
});