'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('./../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DataRows = function DataRows(_ref) {
  var columns = _ref.columns,
      data = _ref.data,
      currentPage = _ref.currentPage,
      rowsPerPage = _ref.rowsPerPage,
      searchText = _ref.searchText,
      searchOptions = _ref.searchOptions,
      searchKeys = _ref.searchKeys,
      allowSearch = _ref.allowSearch;

  //Use column ids as search keys if user doesnt provide any
  var keys = searchKeys.length ? searchKeys : columns.map(function (c) {
    return c.id;
  });

  // Filter text if prop set to true and there is search text - or use all data
  var filteredData = allowSearch && searchText.length ? (0, _utils.searchData)(data, searchText, searchOptions, keys) : data;

  // Paginate filtered data from above
  var paginatedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return paginatedData.map(function (d, dIndex) {
    return _react2.default.createElement(
      'div',
      { className: 'flexgrid-row', key: 'row-' + dIndex },
      columns.map(function (column) {
        var styles = column.style || null;

        return _react2.default.createElement(
          'div',
          { className: 'flexgrid-row-column', key: column.id + '-row-' + dIndex, style: styles },
          d[column.id]
        );
      })
    );
  });
};

exports.default = DataRows;