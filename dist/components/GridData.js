"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GridData = function GridData(props) {
  var columnMetadata = props.columnMetadata,
      page = props.page,
      rowsPerPage = props.rowsPerPage,
      data = props.data;


  if (!data.length) return null;

  var pagedData = data.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return pagedData.map(function (d, i) {
    return _react2.default.createElement(
      "div",
      { className: "flexgrid-item-row", key: i },
      columnMetadata.map(function (column, i) {
        var style = column.style || null;

        return _react2.default.createElement(
          "span",
          { className: "flexgrid-item-col", key: i, style: style },
          d[column.columnName]
        );
      })
    );
  });
};

exports.default = GridData;