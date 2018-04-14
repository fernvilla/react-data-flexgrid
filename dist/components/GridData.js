'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('.');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GridData = function GridData(props) {
  var columns = props.columns,
      currentPage = props.currentPage,
      defaultPageSize = props.defaultPageSize,
      data = props.data,
      allowRowSelection = props.allowRowSelection,
      selectedRows = props.selectedRows,
      subComponent = props.subComponent,
      onRowSelect = props.onRowSelect,
      onRowDeselect = props.onRowDeselect,
      handleCheckboxChange = props.handleCheckboxChange;

  var pagedData = data.slice((currentPage - 1) * defaultPageSize, currentPage * defaultPageSize);

  return _react2.default.createElement(
    'div',
    { className: 'flexgrid-data-container' },
    pagedData.map(function (data, i) {
      return _react2.default.createElement(_.GridRow, {
        key: i,
        data: data,
        allowRowSelection: allowRowSelection,
        selectedRows: selectedRows,
        columns: columns,
        subComponent: subComponent,
        onRowSelect: onRowSelect,
        onRowDeselect: onRowDeselect,
        handleCheckboxChange: handleCheckboxChange
      });
    })
  );
};

exports.default = GridData;