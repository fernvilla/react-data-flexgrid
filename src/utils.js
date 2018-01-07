export const getTotalPages = (dataLength, rowsPerPage) => {
  return Math.ceil(dataLength / rowsPerPage);
};
