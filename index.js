const Quadratic = require('./quadratic.js');
import Solver from '/components/Solver';
import Sidebar from './components/Sidebar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const A = {
  rows: 2,
  columns: 2,
  data: [
    [2, 2],
    [2, 2]
  ]
};

const b = {
  rows: 2,
  columns: 1,
  data: [
    [0],
    [0]
  ]
};

const f = new Quadratic(A,b,0);

console.log(f.evaluate({
  rows: 2,
  columns: 1,
  data: [
    [3],
    [4]
  ]
}).data[0][0]);


import React from "react";
import ReactDom from "react-dom";

const Home = () => {
  return <div>
    <Router>
      <Sidebar/>
      <Solver/>
  </Router>
</div>
};

ReactDom.render(
  <Home/>,
  document.getElementById("root")
);
