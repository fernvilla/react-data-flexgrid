"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _fontawesome = require("@fortawesome/fontawesome");

var _fontawesome2 = _interopRequireDefault(_fontawesome);

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);

var _fontawesomeFreeSolid = require("@fortawesome/fontawesome-free-solid");

var _fontawesomeFreeSolid2 = _interopRequireDefault(_fontawesomeFreeSolid);

var _faAngleRight = require("@fortawesome/fontawesome-free-solid/faAngleRight");

var _faAngleRight2 = _interopRequireDefault(_faAngleRight);

var _faAngleLeft = require("@fortawesome/fontawesome-free-solid/faAngleLeft");

var _faAngleLeft2 = _interopRequireDefault(_faAngleLeft);

var _faAngleDoubleLeft = require("@fortawesome/fontawesome-free-solid/faAngleDoubleLeft");

var _faAngleDoubleLeft2 = _interopRequireDefault(_faAngleDoubleLeft);

var _faAngleDoubleRight = require("@fortawesome/fontawesome-free-solid/faAngleDoubleRight");

var _faAngleDoubleRight2 = _interopRequireDefault(_faAngleDoubleRight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_fontawesome2.default.library.add(_fontawesomeFreeSolid2.default, _faAngleRight2.default, _faAngleLeft2.default, _faAngleDoubleRight2.default, _faAngleDoubleLeft2.default);

var Pager = function Pager(props) {
  var currentPage = props.currentPage,
      totalPages = props.totalPages,
      setPage = props.setPage,
      pageDown = props.pageDown,
      pageUp = props.pageUp,
      setRowsPerPage = props.setRowsPerPage,
      rowsPerPage = props.rowsPerPage;

  var rows = [1, 2, 3, 4, 5, 10, 25, 50, 100, 500, 1000, "All"];

  return _react2.default.createElement(
    "div",
    { className: "flexgrid-footer" },
    _react2.default.createElement(
      "div",
      { className: "flexgrid-footer-left" },
      _react2.default.createElement(
        "span",
        { className: "page-toggle", onClick: function onClick() {
            return setPage(1);
          } },
        _react2.default.createElement(_reactFontawesome2.default, { icon: "angle-double-left" })
      ),
      _react2.default.createElement(
        "span",
        { className: "page-toggle", onClick: function onClick() {
            return pageDown();
          } },
        _react2.default.createElement(_reactFontawesome2.default, { icon: "angle-left" })
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
        { className: "page-toggle", onClick: function onClick() {
            return pageUp();
          } },
        _react2.default.createElement(_reactFontawesome2.default, { icon: "angle-right" })
      ),
      _react2.default.createElement(
        "span",
        { className: "page-toggle", onClick: function onClick() {
            return setPage(totalPages);
          } },
        _react2.default.createElement(_reactFontawesome2.default, { icon: "angle-double-right" })
      )
    ),
    _react2.default.createElement(
      "div",
      { className: "flexgrid-footer-right" },
      "Rows per page:",
      _react2.default.createElement(
        "select",
        {
          onChange: function onChange(e) {
            return setRowsPerPage(e.target.value);
          },
          defaultValue: rowsPerPage
        },
        rows.map(function (row, i) {
          return _react2.default.createElement(
            "option",
            { value: row, key: i },
            row
          );
        })
      )
    )
  );
};

Pager.propType = {
  currentPage: _propTypes2.default.number.isRequired,
  totalPages: _propTypes2.default.number.isRequired,
  setPage: _propTypes2.default.func.isRequirede,
  pageDown: _propTypes2.default.func.isRequired,
  pageUp: _propTypes2.default.func.isRequired,
  setRowsPerPage: _propTypes2.default.func.isRequired,
  rowsPerPage: _propTypes2.default.number.isRequired
};

exports.default = Pager;