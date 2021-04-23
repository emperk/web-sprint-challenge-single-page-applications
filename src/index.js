import React from "react";
import ReactDom from "react-dom";

import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from 'react-router-dom';

const element = <Router><App /></Router>
ReactDom.render(element, document.getElementById('root'))
