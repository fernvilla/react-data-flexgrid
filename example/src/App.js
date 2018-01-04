import React, { Component } from "react";
import { Flexgrid } from "react-data-flexgrid";
import "react-data-flexgrid/dist/css/grid.css";

import { columnMetadata, data } from "./data";
import "./App.css";

export default class App extends Component {
  render() {
    return (
      <div className="example-container">
        <Flexgrid data={data} columnMetadata={columnMetadata} />
      </div>
    );
  }
}
