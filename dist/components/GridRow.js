"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GridRow = function (_Component) {
  _inherits(GridRow, _Component);

  function GridRow() {
    _classCallCheck(this, GridRow);

    var _this = _possibleConstructorReturn(this, (GridRow.__proto__ || Object.getPrototypeOf(GridRow)).call(this));

    _this.onCheckboxClick = function (e, data) {
      e.stopPropagation();
      var _this$props = _this.props,
          onRowSelect = _this$props.onRowSelect,
          onRowDeselect = _this$props.onRowDeselect,
          handleCheckboxChange = _this$props.handleCheckboxChange;

      var action = e.target.checked ? onRowSelect : onRowDeselect;

      action(data);
      handleCheckboxChange(data.rowIndex);
    };

    _this.state = { showSubcomponent: false };
    return _this;
  }

  _createClass(GridRow, [{
    key: "renderSubcomponent",
    value: function renderSubcomponent(data) {
      var showSubComponent = this.state.showSubComponent;
      var subComponent = this.props.subComponent;


      if (!showSubComponent) return null;

      return subComponent(data);
    }
  }, {
    key: "toggleSubComponent",
    value: function toggleSubComponent() {
      this.setState({ showSubComponent: !this.state.showSubComponent });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          columns = _props.columns,
          data = _props.data,
          allowRowSelection = _props.allowRowSelection,
          selectedRows = _props.selectedRows;


      return _react2.default.createElement(
        "div",
        { className: "flexgrid-data-row", onClick: function onClick() {
            return _this2.toggleSubComponent();
          } },
        _react2.default.createElement(
          "div",
          { className: "flexgrid-data-wrapper" },
          allowRowSelection && _react2.default.createElement(
            "span",
            { className: "flexgrid-data-col" },
            _react2.default.createElement("input", {
              type: "checkbox",
              onClick: function onClick(e) {
                return _this2.onCheckboxClick(e, data);
              },
              checked: selectedRows.indexOf(data.rowIndex) > -1
            })
          ),
          columns.map(function (column, i) {
            var style = column.style || null;

            return _react2.default.createElement(
              "span",
              { className: "flexgrid-data-col", key: i, style: style },
              data[column.columnName]
            );
          })
        ),
        this.renderSubcomponent(data)
      );
    }
  }]);

  return GridRow;
}(_react.Component);

exports.default = GridRow;