import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Call it once in your app. At the root of your app is the best place

import { Provider } from "react-redux";
import configureStore from "./stores/configureStore";

toast.configure();
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ToastContainer
      style={{
        width: "425px",
        wordBreak: "break-all"
      }}
    />
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
