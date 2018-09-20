"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Search = function Search(_ref) {
  var setSearchText = _ref.setSearchText;

  var inputChangeHandler = function inputChangeHandler(e) {
    setSearchText(e.target.value);
  };

  return _react2.default.createElement(
    "div",
    { className: "flexgrid-search" },
    "Search:",
    _react2.default.createElement("input", { type: "search", onChange: inputChangeHandler })
  );
};

exports.default = Search;