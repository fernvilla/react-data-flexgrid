import React from 'react';
import faker from 'faker';
import _times from 'lodash/times';

export const columns = [
  {
    id: 'id',
    displayText: 'ID',
    style: { flex: '0 1 50px', alignSelf: 'center' }
  },
  {
    id: 'firstName',
    displayText: 'First Name',
    style: { flex: '1 1 100px', alignSelf: 'center' }
  },
  {
    id: 'lastName',
    displayText: 'Last Name',
    style: { flex: '1 1 100px', alignSelf: 'center' }
  },
  {
    id: 'address',
    displayText: 'Address',
    style: { flex: '1 1 100px', alignSelf: 'center' }
  },
  {
    id: 'city',
    displayText: 'City',
    style: { flex: '1 1 100px', alignSelf: 'center' }
  },
  {
    id: 'state',
    displayText: 'State',
    style: { flex: '1 1 100px', alignSelf: 'center' }
  },
  {
    id: 'country',
    displayText: 'Country',
    style: { flex: '1 1 100px', alignSelf: 'center' }
  },
  {
    id: 'phone',
    displayText: 'Phone Number',
    style: { flex: '1 1 100px', alignSelf: 'center' }
  },
  {
    id: 'birthdate',
    displayText: 'Birthdate',
    style: { flex: '1 1 100px', alignSelf: 'center' },
    component: () => <input type="checkbox" />
  }
];

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

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
    birthdate: randomDate(new Date(2012, 0, 1), new Date()).toISOString()
  }));
