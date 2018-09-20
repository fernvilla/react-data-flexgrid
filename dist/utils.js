'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchData = exports.sortData = exports.calcualteTotalPages = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _natsort = require('natsort');

var _natsort2 = _interopRequireDefault(_natsort);

var _fuse = require('fuse.js');

var _fuse2 = _interopRequireDefault(_fuse);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var calcualteTotalPages = exports.calcualteTotalPages = function calcualteTotalPages(dataLength, defaultPageSize) {
  return Math.ceil(dataLength / defaultPageSize);
};

var sortData = exports.sortData = function sortData(data, column, direction) {
  var sorter = (0, _natsort2.default)({
    insensitive: true,
    desc: direction === _constants.descendString || direction !== _constants.ascendString
  });

  return data.sort(function (a, b) {
    return sorter(a[column], b[column]);
  });
};

var searchData = exports.searchData = function searchData(data, searchTerm, searchOptions, searchKeys) {
  var options = _extends({}, searchOptions, { keys: searchKeys });
  var fuse = new _fuse2.default(data, options);

  return fuse.search(searchTerm);
};