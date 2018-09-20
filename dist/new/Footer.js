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
    { className: "flexgrid-footer" },
    _react2.default.createElement(
      "div",
      { className: "flexgrid-footer-left" },
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
      null,
      _react2.default.createElement(
        "span",
        { className: "page-toggle", onClick: function onClick() {
            return setCurrentPage(1);
          } },
        "\xAB"
      ),
      _react2.default.createElement(
        "span",
        { className: "page-toggle", onClick: setPageDown },
        "\u2039"
      ),
      _react2.default.createElement(
        "span",
        { className: "page-count" },
        "Page ",
        currentPage,
        " of ",
        totalPages
      ),
      _react2.default.createElement(
        "span",
        { className: "page-toggle", onClick: setPageUp },
        "\u203A"
      ),
      _react2.default.createElement(
        "span",
        {
          className: "page-toggle",
          onClick: function onClick() {
            return setCurrentPage(totalPages);
          }
        },
        "\xBB"
      )
    )
  );
};

exports.default = Footer;