"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Row = function Row(props) {
  var columnMetadata = props.columnMetadata,
      style = props.style;

  return _react2.default.createElement(
    "div",
    { className: "flexgrid-header" },
    columnMetadata.map(function (column, i) {
      var style = column.style || null;

      return _react2.default.createElement(
        "span",
        { className: "flexgrid-header-item", key: i, style: style },
        column.displayName
      );
    })
  );
};

exports.default = Row;