"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _fontawesome = require("@fortawesome/fontawesome");

var _fontawesome2 = _interopRequireDefault(_fontawesome);

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);

var _fontawesomeFreeSolid = require("@fortawesome/fontawesome-free-solid");

var _fontawesomeFreeSolid2 = _interopRequireDefault(_fontawesomeFreeSolid);

var _faCaretUp = require("@fortawesome/fontawesome-free-solid/faCaretUp");

var _faCaretUp2 = _interopRequireDefault(_faCaretUp);

var _faCaretDown = require("@fortawesome/fontawesome-free-solid/faCaretDown");

var _faCaretDown2 = _interopRequireDefault(_faCaretDown);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_fontawesome2.default.library.add(_fontawesomeFreeSolid2.default, _faCaretUp2.default, _faCaretDown2.default);

var Row = function Row(props) {
  var columnMetadata = props.columnMetadata,
      sortableCols = props.sortableCols,
      sortName = props.sortName,
      sortDirection = props.sortDirection,
      sort = props.sort;

  console.log(sortName, sortDirection);
  return _react2.default.createElement(
    "div",
    { className: "flexgrid-header" },
    columnMetadata.map(function (column, i) {
      var style = column.style || null;
      var columnName = column.columnName,
          displayName = column.displayName;

      var isSortable = sortableCols.includes(columnName);

      return _react2.default.createElement(
        "span",
        { className: "flexgrid-header-item", key: i, style: style },
        displayName,
        isSortable && _react2.default.createElement(
          "span",
          null,
          _react2.default.createElement(
            "div",
            {
              className: (0, _classnames2.default)("flexgrid-header-sort", {
                active: sortName === columnName && sortDirection === "ASC"
              }),
              onClick: function onClick() {
                return sort(columnName, "ASC");
              }
            },
            _react2.default.createElement(_reactFontawesome2.default, { icon: "caret-up" })
          ),
          _react2.default.createElement(
            "div",
            {
              className: (0, _classnames2.default)("flexgrid-header-sort", {
                active: sortName === columnName && sortDirection === "DESC"
              }),
              onClick: function onClick() {
                return sort(columnName, "DESC");
              }
            },
            _react2.default.createElement(_reactFontawesome2.default, { icon: "caret-down" })
          )
        )
      );
    })
  );
};

exports.default = Row;