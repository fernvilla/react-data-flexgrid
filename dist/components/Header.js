"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = function Header(_ref) {
  var sortData = _ref.sortData,
      columns = _ref.columns;

  var renderColumns = function renderColumns() {
    return columns.map(function (column, i) {
      var styles = column.style || null;

      return _react2.default.createElement(
        "div",
        {
          className: "flexgrid-header-column",
          key: column.id + "-" + i,
          style: styles,
          onClick: function onClick() {
            return sortData(column.id);
          } },
        column.display
      );
    });
  };

  return _react2.default.createElement(
    "div",
    { className: "flexgrid-header" },
    renderColumns()
  );
};

exports.default = Header;