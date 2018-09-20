import React, { Component } from 'react';
import { Flexgrid } from 'react-data-flexgrid';
import 'react-data-flexgrid/dist/css/grid.css';

import { columns, data } from './data';
import './App.css';

const amounts = [10, 20, 50, 100, 200, 500, 1000, 5000, 10000];

export default class App extends Component {
  constructor() {
    super();

    this.state = { data: [] };
  }

  componentDidMount() {
    this.fetchSampleData(amounts[0]);
  }

  onChange = e => {
    this.fetchSampleData(e.target.value);
  };

  fetchSampleData(amount) {
    this.setState({ data: data(amount) });
  }

  render() {
    const { data } = this.state;

    return (
      <div className="example-container">
        <p>
          # of Sample Items:{' '}
          <select onChange={this.onChange}>
            {amounts.map(i => (
              <option value={i} key={i}>
                {i}
              </option>
            ))}
          </select>
        </p>

        <hr />

        <Flexgrid columns={columns} data={data} />
      </div>
    );
  }
}
