'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _fontawesomeSvgCore = require('@fortawesome/fontawesome-svg-core');

var _reactFontawesome = require('@fortawesome/react-fontawesome');

var _freeSolidSvgIcons = require('@fortawesome/free-solid-svg-icons');

var _constants = require('./../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_fontawesomeSvgCore.library.add(_freeSolidSvgIcons.faChevronUp);
_fontawesomeSvgCore.library.add(_freeSolidSvgIcons.faChevronDown);

var Header = function Header(_ref) {
  var sortData = _ref.sortData,
      columns = _ref.columns,
      sortedColumn = _ref.sortedColumn,
      sortDirection = _ref.sortDirection,
      sort = _ref.sort;

  var renderColumns = function renderColumns() {
    var sortColumns = sort.sortColumns;


    return columns.map(function (column, i) {
      var name = column.name;

      var styles = column.style || null;
      var sortable = sortColumns.indexOf(name) > -1;

      if (!sortable) {
        return _react2.default.createElement(
          'div',
          { className: 'fg-header-column', key: name + '-' + i, style: styles },
          column.displayText
        );
      }

      return _react2.default.createElement(
        'div',
        {
          className: 'fg-header-column',
          key: name + '-' + i,
          style: styles,
          onClick: function onClick() {
            return sortData(name);
          } },
        column.displayText,
        _react2.default.createElement(
          'div',
          { className: 'fg-header-sort-container' },
          _react2.default.createElement(_reactFontawesome.FontAwesomeIcon, {
            icon: 'chevron-up',
            className: (0, _classnames2.default)('fg-sort-icon', {
              active: name === sortedColumn && sortDirection === _constants.ascendString
            })
          }),
          _react2.default.createElement(_reactFontawesome.FontAwesomeIcon, {
            icon: 'chevron-down',
            className: (0, _classnames2.default)('fg-sort-icon', {
              active: name === sortedColumn && sortDirection === _constants.descendString
            })
          })
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