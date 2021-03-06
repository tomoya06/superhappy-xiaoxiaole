import { render } from "preact";
import { App } from "./app";
import store from "./store/index";
import { Provider } from "react-redux";
import "./index.css";
import "./utils/logger";

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")!
);
