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

var _faSortUp = require("@fortawesome/fontawesome-free-solid/faSortUp");

var _faSortUp2 = _interopRequireDefault(_faSortUp);

var _faSortDown = require("@fortawesome/fontawesome-free-solid/faSortDown");

var _faSortDown2 = _interopRequireDefault(_faSortDown);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_fontawesome2.default.library.add(_fontawesomeFreeSolid2.default, _faSortUp2.default, _faSortDown2.default);

var Row = function Row(props) {
  var columns = props.columns,
      sortColumn = props.sortColumn,
      sortDirection = props.sortDirection,
      sort = props.sort;


  return _react2.default.createElement(
    "div",
    { className: "flexgrid-header-row" },
    columns.map(function (column, i) {
      var style = column.style || null;
      var columnName = column.columnName,
          displayName = column.displayName;


      return _react2.default.createElement(
        "span",
        { className: "flexgrid-header-col", key: i, style: style },
        displayName,
        column.sortable && _react2.default.createElement(
          "span",
          null,
          _react2.default.createElement(
            "div",
            {
              className: (0, _classnames2.default)("flexgrid-header-sort-icon", {
                active: sortColumn === columnName && sortDirection === "ASC"
              }),
              onClick: function onClick() {
                return sort(columnName, "ASC");
              }
            },
            _react2.default.createElement(_reactFontawesome2.default, { icon: "sort-up" })
          ),
          _react2.default.createElement(
            "div",
            {
              className: (0, _classnames2.default)("flexgrid-header-sort-icon", {
                active: sortColumn === columnName && sortDirection === "DESC"
              }),
              onClick: function onClick() {
                return sort(columnName, "DESC");
              }
            },
            _react2.default.createElement(_reactFontawesome2.default, { icon: "sort-down" })
          )
        )
      );
    })
  );
};

exports.default = Row;