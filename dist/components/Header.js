'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _constants = require('./../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = function Header(_ref) {
  var sortData = _ref.sortData,
      columns = _ref.columns,
      sortColumn = _ref.sortColumn,
      sortDirection = _ref.sortDirection;

  var renderColumns = function renderColumns() {
    return columns.map(function (column, i) {
      var id = column.id;

      var styles = column.style || null;

      return _react2.default.createElement(
        'div',
        {
          className: 'fg-header-column',
          key: id + '-' + i,
          style: styles,
          onClick: function onClick() {
            return sortData(id);
          } },
        column.displayText,
        _react2.default.createElement(
          'div',
          { className: 'fg-header-sort-container' },
          _react2.default.createElement(
            'span',
            {
              className: (0, _classnames2.default)('fg-sort-icon up-arrow', {
                active: id === sortColumn && sortDirection === _constants.ascendString
              }) },
            '\u2191'
          ),
          _react2.default.createElement(
            'span',
            {
              className: (0, _classnames2.default)('fg-sort-icon down-arrow', {
                active: id === sortColumn && sortDirection === _constants.descendString
              }) },
            '\u2193'
          )
        )
      );
    });
  };

  return _react2.default.createElement(
    'div',
    { className: 'fg-header' },
    renderColumns()
  );
};

exports.default = Header;