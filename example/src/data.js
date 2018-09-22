import faker from 'faker';
import _times from 'lodash/times';

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
    phone: faker.phone.phoneNumber(),
    birthdate: randomDate(new Date(2012, 0, 1), new Date()).toISOString()
  }));
