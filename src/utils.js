import natsort from 'natsort';
import Fuse from 'fuse.js';

export const getTotalPages = (dataLength, defaultPageSize) => {
  return Math.ceil(dataLength / defaultPageSize);
};

export const sortData = (data, column, direction) => {
  const sorter = natsort({ insensitive: true, desc: direction === 'DESC' });
  const results = data.sort((a, b) => sorter(a[column], b[column]));

  return results;
};

export const filterData = (data, keys, text) => {
  const fuse = new Fuse(data, { keys });
  const results = fuse.search(text);

  return results;
};
