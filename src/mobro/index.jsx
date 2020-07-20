import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {createStore} from "redux";
import reducers from "mobro/reducers";
import App from "mobro/components/container/app";

const store = createStore(reducers);
const $app = document.getElementById("app");

const dom = (
    <Provider store={store}>
        <App/>
    </Provider>
);

ReactDOM.render(dom, $app);