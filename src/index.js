// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";
// // import { render } from 'react-dom'

// ReactDOM.render(<App />, document.getElementById("root"));

import React from "react";
import { render } from "react-dom";

import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from 'react-router-dom';

render(
  <Router>
    <App />
  </Router>
  , document.querySelector('#root')
)
