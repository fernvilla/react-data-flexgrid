"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Filter = function Filter(props) {
  var columns = props.columns,
      filter = props.filter;


  return _react2.default.createElement(
    "div",
    { className: "fg-filter-row" },
    columns.map(function (column, i) {
      var style = column.style || null;

      return _react2.default.createElement(
        "span",
        { className: "fg-filter-col", key: i, style: style },
        _react2.default.createElement("input", {
          type: "text",
          onChange: function onChange(e) {
            return filter(column.columnName, e.target.value);
          }
        })
      );
    })
  );
};

exports.default = Filter;