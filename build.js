"use strict";

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function pad0(value) {
  var result = value.toString();
  if (result.length < 2) {
    result = '0' + result;
  }
  return result;
}

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

    _this.state = {
      running: false,
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      },
      results: []
    };
    return _this;
  }

  _createClass(App, [{
    key: "calculate",
    value: function calculate() {
      this.state.times.miliseconds += 1;
      if (this.state.times.miliseconds >= 100) {
        this.state.times.seconds += 1;
        this.state.times.miliseconds = 0;
      };
      if (this.state.times.seconds >= 60) {
        this.state.times.minutes += 1;
        this.state.times.seconds = 0;
      };
    }
  }, {
    key: "step",
    value: function step() {
      if (!this.state.running) return;
      this.calculate();
      this.setState({
        times: {
          minutes: this.state.times.minutes,
          seconds: this.state.times.seconds,
          miliseconds: this.state.times.miliseconds
        }
      });
    }
  }, {
    key: "start",
    value: function start() {
      var _this2 = this;

      if (!this.state.running) {
        this.setState({
          running: true
        });
        this.watch = setInterval(function () {
          return _this2.step();
        }, 10);
      }
    }
  }, {
    key: "stop",
    value: function stop() {
      this.setState({
        running: false
      });
      clearInterval(this.watch);
    }
  }, {
    key: "save",
    value: function save() {
      this.setState({
        results: [].concat(_toConsumableArray(this.state.results), [this.state.times])
      });
    }
  }, {
    key: "restart",
    value: function restart() {
      this.setState({
        times: {
          minutes: 0,
          seconds: 0,
          miliseconds: 0
        }
      });;
    }
  }, {
    key: "reset",
    value: function reset() {
      this.save();
      this.restart();
      this.stop();
    }
  }, {
    key: "clear",
    value: function clear() {
      this.setState({
        results: []
      });
    }
  }, {
    key: "format",
    value: function format(times) {
      return pad0(times.minutes) + ":" + pad0(times.seconds) + ":" + pad0(Math.floor(times.miliseconds));
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return _jsx("div", {
        className: "container"
      }, void 0, _jsx("nav", {
        className: "controls"
      }, void 0, _jsx("button", {
        type: "button",
        id: "start",
        onClick: function onClick() {
          return _this3.start();
        }
      }, void 0, "start"), _jsx("button", {
        type: "button",
        id: "stop",
        onClick: function onClick() {
          return _this3.stop();
        }
      }, void 0, "stop"), _jsx("button", {
        type: "button",
        id: "reset",
        onClick: function onClick() {
          return _this3.reset();
        }
      }, void 0, "save & reset"), _jsx("button", {
        type: "button",
        id: "clear",
        onClick: function onClick() {
          return _this3.clear();
        }
      }, void 0, "clear")), _jsx("div", {
        className: "stopwatch"
      }, void 0, this.format(this.state.times)), _jsx("ul", {
        className: "results"
      }, void 0, this.state.results.map(function (result) {
        return _jsx("li", {}, void 0, _this3.format(result));
      })));
    }
  }]);

  return App;
}(React.Component);

var app = document.getElementById('app');
ReactDOM.render(_jsx(App, {}), app);
