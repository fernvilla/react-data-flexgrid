import natsort from "natsort";

export const getTotalPages = (dataLength, rowsPerPage) =>
  Math.ceil(dataLength / rowsPerPage);

export const sortData = (data, column, direction) => {
  const sorter = natsort({ insensitive: true, desc: direction === "DESC" });

  return data.sort((a, b) => sorter(a[column], b[column]));
};
