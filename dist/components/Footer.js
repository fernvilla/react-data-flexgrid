"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Footer = function Footer(_ref) {
  var dataLength = _ref.dataLength,
      rowsPerPage = _ref.rowsPerPage,
      currentPage = _ref.currentPage,
      totalPages = _ref.totalPages,
      setCurrentPage = _ref.setCurrentPage,
      setPageDown = _ref.setPageDown,
      setPageUp = _ref.setPageUp;

  var pageStartPosition = (currentPage - 1) * rowsPerPage + 1;
  var pageEndPosition = rowsPerPage * currentPage;

  return _react2.default.createElement(
    "div",
    { className: "fg-footer" },
    _react2.default.createElement(
      "div",
      { className: "fg-footer-left" },
      "Showing ",
      pageStartPosition,
      " to ",
      pageEndPosition,
      " of ",
      dataLength,
      " entries"
    ),
    _react2.default.createElement(
      "div",
      { className: "fg-footer-toggle-container" },
      _react2.default.createElement("span", { className: "fg-page-toggle left-all", onClick: function onClick() {
          return setCurrentPage(1);
        } }),
      _react2.default.createElement("span", { className: "fg-page-toggle left", onClick: setPageDown }),
      _react2.default.createElement(
        "span",
        { className: "page-count" },
        "Page ",
        currentPage,
        " of ",
        totalPages
      ),
      _react2.default.createElement("span", { className: "fg-page-toggle right", onClick: setPageUp }),
      _react2.default.createElement("span", { className: "fg-page-toggle right-all", onClick: function onClick() {
          return setCurrentPage(totalPages);
        } })
    )
  );
};

exports.default = Footer;