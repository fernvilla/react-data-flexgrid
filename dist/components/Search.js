'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _fontawesome = require('@fortawesome/fontawesome');

var _fontawesome2 = _interopRequireDefault(_fontawesome);

var _reactFontawesome = require('@fortawesome/react-fontawesome');

var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);

var _fontawesomeFreeSolid = require('@fortawesome/fontawesome-free-solid');

var _fontawesomeFreeSolid2 = _interopRequireDefault(_fontawesomeFreeSolid);

var _faSearch = require('@fortawesome/fontawesome-free-solid/faSearch');

var _faSearch2 = _interopRequireDefault(_faSearch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

_fontawesome2.default.library.add(_fontawesomeFreeSolid2.default, _faSearch2.default);

var Search = function (_Component) {
  _inherits(Search, _Component);

  function Search() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Search);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Search.__proto__ || Object.getPrototypeOf(Search)).call.apply(_ref, [this].concat(args))), _this), _this.state = { showSearchInput: false }, _this.toggleSearch = function () {
      _this.setState({ showSearchInput: !_this.state.showSearchInput });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Search, [{
    key: 'renderInput',
    value: function renderInput() {
      var _this2 = this;

      var containerStyle = { display: this.state.showSearchInput ? 'inline' : 'none' };

      return _react2.default.createElement(
        'span',
        { className: 'flexgrid-search-container', style: containerStyle },
        _react2.default.createElement('input', {
          type: 'search',
          placeholder: 'Search',
          onChange: function onChange(e) {
            return _this2.props.filter(e.target.value);
          },
          className: 'flexgrid-search-input'
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'flexgrid-search' },
        _react2.default.createElement(_reactFontawesome2.default, {
          icon: 'search',
          className: 'flexgrid-search-icon',
          color: this.state.showSearchInput ? '#000' : '',
          onClick: this.toggleSearch
        }),
        this.renderInput()
      );
    }
  }]);

  return Search;
}(_react.Component);

Search.propTypes = {
  filter: _propTypes2.default.func.isRequired
};
exports.default = Search;