import React, { Component } from "react";
import { Flexgrid } from "react-data-flexgrid";
import "react-data-flexgrid/dist/css/grid.css";

import { columns, data } from "./data";
import "./App.css";

const amounts = [10, 20, 50, 100, 200, 500, 1000, 5000, 10000];

export default class App extends Component {
  constructor() {
    super();

    this.state = { data: [] };
  }

  componentDidMount() {
    this.fetchSampleData(amounts[0]);
  }

  fetchSampleData(amount) {
    this.setState({ data: data(amount) });
  }

  onChange = e => {
    this.fetchSampleData(e.target.value);
  };

  onRowSelect = data => {
    console.log("row selected", data);
  };

  onRowDeselect = data => {
    console.log("row deselected", data);
  };

  render() {
    const { data } = this.state;
    const subComponent = props => (
      <div style={{ padding: 10, backgroundColor: "#fff", borderBottom: "1px solid #ccc" }}>
        {JSON.stringify(props)}
      </div>
    );

    return (
      <div className="example-container">
        <p>
          Items:{" "}
          <select onChange={e => this.onChange(e)}>
            {amounts.map(i => (
              <option value={i} key={i}>
                {i}
              </option>
            ))}
          </select>
        </p>

        <Flexgrid
          columns={columns}
          data={data}
          filterable
          columnFilters={["lastName", "firstName"]}
          allowRowSelection
          onRowSelect={this.onRowSelect}
          onRowDeselect={this.onRowDeselect}
          subComponent={subComponent}
        />
      </div>
    );
  }
}
