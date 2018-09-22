import natsort from 'natsort';
import Fuse from 'fuse.js';
import { descendString, ascendString } from './constants';

export const calcualteTotalPages = (dataLength, rowsPerPage) => {
  return Math.ceil(dataLength / rowsPerPage);
};

export const sortData = (data, column, direction) => {
  const sorter = natsort({
    insensitive: true,
    desc: direction === descendString || direction !== ascendString
  });

  return data.sort((a, b) => sorter(a[column], b[column]));
};

export const searchData = (data, searchTerm, searchOptions, searchKeys) => {
  const options = { ...searchOptions, ...{ keys: searchKeys } };
  const fuse = new Fuse(data, options);

  return fuse.search(searchTerm);
};
