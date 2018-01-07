import React, { Component } from "react";
import { Flexgrid } from "react-data-flexgrid";
import "react-data-flexgrid/dist/css/grid.css";

import { columnMetadata, data, sort } from "./data";
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

  render() {
    const { data } = this.state;

    return (
      <div className="example-container">
        <p>
          <select onChange={e => this.onChange(e)}>
            {amounts.map(i => (
              <option value={i} key={i}>
                {i}
              </option>
            ))}
          </select>
        </p>

        <Flexgrid data={data} columnMetadata={columnMetadata} sort={sort} />
      </div>
    );
  }
}
