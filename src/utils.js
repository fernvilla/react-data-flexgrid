import natsort from 'natsort';
import Fuse from 'fuse.js';
import { descendString, ascendString } from './constants';

export const calcualteTotalPages = (dataLength, rowsPerPage) => {
  return Math.ceil(dataLength / rowsPerPage);
};

export const sortData = (data, column, direction, sort) => {
  const sorter = natsort({
    insensitive: true,
    desc: direction === descendString || direction !== ascendString
  });
  const sortByColumnKey = sort.sortKeys[column];

  return data.sort((a, b) => {
    if (sortByColumnKey) {
      return sorter(sortByColumnKey(a[column]), sortByColumnKey(b[column]));
    }

    return sorter(a[column], b[column]);
  });
};

export const searchData = (data, searchTerm, searchOptions, searchKeys) => {
  const options = { ...searchOptions, ...{ keys: searchKeys } };
  const fuse = new Fuse(data, options);

  return fuse.search(searchTerm);
};
