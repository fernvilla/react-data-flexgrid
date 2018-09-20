"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rows = [1, 2, 3, 4, 5, 10, 25, 50, 100, 500, 1000, "All"];

var RowsToggle = function RowsToggle(_ref) {
  var setRowsPerPage = _ref.setRowsPerPage,
      rowsPerPage = _ref.rowsPerPage;

  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(
      "span",
      { className: "flexgrid-toggle-container" },
      "Show",
      _react2.default.createElement(
        "select",
        {
          onChange: function onChange(e) {
            return setRowsPerPage(e.target.value);
          },
          value: rowsPerPage
        },
        rows.map(function (row, i) {
          return _react2.default.createElement(
            "option",
            { value: row, key: i },
            row
          );
        })
      ),
      "entries"
    )
  );
};

exports.default = RowsToggle;