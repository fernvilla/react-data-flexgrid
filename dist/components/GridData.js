"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GridData = function GridData(props) {
  var columns = props.columns,
      currentPage = props.currentPage,
      defaultPageSize = props.defaultPageSize,
      data = props.data,
      allowRowSelection = props.allowRowSelection,
      onRowSelect = props.onRowSelect,
      onRowDeselect = props.onRowDeselect,
      handleCheckboxChange = props.handleCheckboxChange,
      selectedRows = props.selectedRows;


  if (!data.length) return null;

  var pagedData = data.slice((currentPage - 1) * defaultPageSize, currentPage * defaultPageSize);

  var onCheckboxClick = function onCheckboxClick(e, data) {
    var action = e.target.checked ? onRowSelect : onRowDeselect;

    action(data);
    handleCheckboxChange(data.rowIndex);
  };

  return _react2.default.createElement(
    "div",
    { className: "flexgrid-data-container" },
    pagedData.map(function (data, i) {
      return _react2.default.createElement(
        "div",
        { className: "flexgrid-item-row", key: i },
        allowRowSelection && _react2.default.createElement(
          "span",
          { className: "flexgrid-item-col" },
          _react2.default.createElement("input", {
            type: "checkbox",
            onClick: function onClick(e) {
              return onCheckboxClick(e, data);
            },
            checked: selectedRows.indexOf(data.rowIndex) > -1
          })
        ),
        columns.map(function (column, i) {
          var style = column.style || null;

          return _react2.default.createElement(
            "span",
            { className: "flexgrid-item-col", key: i, style: style },
            data[column.columnName]
          );
        })
      );
    })
  );
};

exports.default = GridData;