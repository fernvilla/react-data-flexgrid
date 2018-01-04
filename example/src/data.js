import React from "react";
import faker from "faker";
import _times from "lodash/times";

export const columnMetadata = [
  {
    columnName: "id",
    displayName: "ID",
    style: { flex: "0 1 50px", alignSelf: "center" }
  },
  {
    columnName: "firstName",
    displayName: "First Name",
    style: { flex: "1 1 100px", alignSelf: "center" }
  },
  {
    columnName: "lastName",
    displayName: "Last Name",
    style: { flex: "1 1 100px", alignSelf: "center" }
  },
  {
    columnName: "address",
    displayName: "Address",
    style: { flex: "1 1 100px", alignSelf: "center" }
  },
  {
    columnName: "city",
    displayName: "City",
    style: { flex: "1 1 100px", alignSelf: "center" }
  }
];

export const data = _times(24, i => ({
  id: i,
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: faker.address.streetAddress(),
  city: faker.address.city()
}));
