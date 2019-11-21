import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, compose } from "redux";
import reducer from "./reducers";
import App from "./routes/App";

const initialState = {
  "defaultLocation": { lat: 19.42672619, lng: -99.1718706 },
  "zoom": 15,
  "from": { lat: 19.42672619, lng: -99.1718706 },
  "to":{ lat: 19.4428928, lng: -99.1718706 },
  "distance": 0,
  "time": 0,
  "money": 0.00,
  "country": "mexico",
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancers());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
