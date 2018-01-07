"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getTotalPages = exports.getTotalPages = function getTotalPages(dataLength, rowsPerPage) {
  return Math.ceil(dataLength / rowsPerPage);
};