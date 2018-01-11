"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortData = exports.getTotalPages = undefined;

var _natsort = require("natsort");

var _natsort2 = _interopRequireDefault(_natsort);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getTotalPages = exports.getTotalPages = function getTotalPages(dataLength, rowsPerPage) {
  return Math.ceil(dataLength / rowsPerPage);
};

var sortData = exports.sortData = function sortData(data, column, direction) {
  var sorter = (0, _natsort2.default)({ insensitive: true, desc: direction === "DESC" });

  return data.sort(function (a, b) {
    return sorter(a[column], b[column]);
  });
};