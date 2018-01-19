"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GridData = function GridData(props) {
  var columns = props.columns,
      currentPage = props.currentPage,
      defaultPageSize = props.defaultPageSize,
      data = props.data;


  if (!data.length) return null;

  var pagedData = data.slice((currentPage - 1) * defaultPageSize, currentPage * defaultPageSize);

  return _react2.default.createElement(
    "div",
    { className: "flexgrid-data-container" },
    pagedData.map(function (d, i) {
      return _react2.default.createElement(
        "div",
        { className: "flexgrid-item-row", key: i },
        columns.map(function (column, i) {
          var style = column.style || null;

          return _react2.default.createElement(
            "span",
            { className: "flexgrid-item-col", key: i, style: style },
            d[column.columnName]
          );
        })
      );
    })
  );
};

exports.default = GridData;