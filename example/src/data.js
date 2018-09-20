// import React from "react";
import faker from 'faker';
import _times from 'lodash/times';
import moment from 'moment';

export const columns = [
  {
    id: 'id',
    display: 'ID',
    style: { flex: '0 1 50px', alignSelf: 'center' }
  },
  {
    id: 'firstName',
    display: 'First Name',
    style: { flex: '1 1 100px', alignSelf: 'center' }
  },
  {
    id: 'lastName',
    display: 'Last Name',
    style: { flex: '1 1 100px', alignSelf: 'center' }
  },
  {
    id: 'address',
    display: 'Address',
    style: { flex: '1 1 100px', alignSelf: 'center' }
  },
  {
    id: 'city',
    display: 'City',
    style: { flex: '1 1 100px', alignSelf: 'center' }
  },
  {
    id: 'state',
    display: 'State',
    style: { flex: '1 1 100px', alignSelf: 'center' }
  },
  {
    id: 'country',
    display: 'Country',
    style: { flex: '1 1 100px', alignSelf: 'center' }
  },
  {
    id: 'phone',
    display: 'Phone Number',
    style: { flex: '1 1 100px', alignSelf: 'center' }
  },
  {
    id: 'birthdate',
    display: 'Birthdate',
    style: { flex: '1 1 100px', alignSelf: 'center' }
  }
];

export const data = amount =>
  _times(amount, i => ({
    id: i,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    country: faker.address.country(),
    phone: faker.phone.phoneNumber(),
    birthdate: moment(faker.date.future()).format('M/D/YY')
  }));
