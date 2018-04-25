'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterData = exports.sortData = exports.getTotalPages = undefined;

var _natsort = require('natsort');

var _natsort2 = _interopRequireDefault(_natsort);

var _fuse = require('fuse.js');

var _fuse2 = _interopRequireDefault(_fuse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getTotalPages = exports.getTotalPages = function getTotalPages(dataLength, defaultPageSize) {
  return Math.ceil(dataLength / defaultPageSize);
};

var sortData = exports.sortData = function sortData(data, column, direction) {
  var sorter = (0, _natsort2.default)({ insensitive: true, desc: direction === 'DESC' });
  var results = data.sort(function (a, b) {
    return sorter(a[column], b[column]);
  });

  return results;
};

var filterData = exports.filterData = function filterData(data, key, text) {
  var fuse = new _fuse2.default(data, { keys: [key] });
  var results = fuse.search(text);

  return results;
};