import React, { Component } from 'react';
import moment from 'moment';

import { Flexgrid } from 'react-data-flexgrid';
import 'react-data-flexgrid/dist/css/grid.css';

import { data } from './data';
import './App.css';

const amounts = [10, 20, 50, 100, 200, 500, 1000, 5000, 10000];

const mapCellContent = ({ columnName, data }) => {
  switch (columnName) {
    case 'firstName':
      return <em>{data}</em>;

    case 'birthdate':
      return <span>{moment(data).format('M/D/YY')}</span>;

    default:
      return data;
  }
};

const columns = [
  {
    name: 'id',
    displayText: 'ID',
    style: { flex: '0 1 50px', alignSelf: 'center' }
  },
  {
    name: 'firstName',
    displayText: 'First Name',
    style: { flex: '1 1 100px', alignSelf: 'center' }
  },
  {
    name: 'lastName',
    displayText: 'Last Name',
    style: { flex: '1 1 100px', alignSelf: 'center' }
  },
  {
    name: 'address',
    displayText: 'Address',
    style: { flex: '1 1 150px', alignSelf: 'center' }
  },
  {
    name: 'city',
    displayText: 'City',
    style: { flex: '1 1 100px', alignSelf: 'center' }
  },
  {
    name: 'state',
    displayText: 'State',
    style: { flex: '1 1 100px', alignSelf: 'center' }
  },
  {
    name: 'phone',
    displayText: 'Phone Number',
    style: { flex: '1 1 120px', alignSelf: 'center' }
  },
  {
    name: 'birthdate',
    displayText: 'Birthdate',
    style: { flex: '1 1 50px', alignSelf: 'center' }
  }
];

export default class App extends Component {
  state = { data: [] };

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
        <br />
        <br />

        <Flexgrid columns={columns} cells={mapCellContent} data={data} />
      </div>
    );
  }
}
