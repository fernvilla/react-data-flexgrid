// import React from "react";
import faker from "faker";
import _times from "lodash/times";
import moment from "moment";

export const columns = [
  {
    columnName: "id",
    displayName: "ID",
    style: { flex: "0 1 50px", alignSelf: "center" },
    sortable: true
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
  },
  {
    columnName: "state",
    displayName: "State",
    style: { flex: "1 1 100px", alignSelf: "center" }
  },
  {
    columnName: "country",
    displayName: "Country",
    style: { flex: "1 1 100px", alignSelf: "center" }
  },
  {
    columnName: "phone",
    displayName: "Phone Number",
    style: { flex: "1 1 100px", alignSelf: "center" }
  },
  {
    columnName: "birthdate",
    displayName: "Birthdate",
    style: { flex: "1 1 100px", alignSelf: "center" },
    sortable: true
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
    birthdate: moment(faker.date.future()).format("M/D/YY")
  }));
