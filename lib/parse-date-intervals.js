"use strict";

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _parseDates = require("@datagica/parse-dates");

var _xregexp = require("xregexp");

var _xregexp2 = _interopRequireDefault(_xregexp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ParseDateIntervals = function (_ParseDates) {
  (0, _inherits3.default)(ParseDateIntervals, _ParseDates);

  function ParseDateIntervals() {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, ParseDateIntervals);

    var _this = (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(ParseDateIntervals).call(this, opts));

    _this.intervalPrefix = "(?:(?:de|from)?\\s+)?";
    _this.intervalSeparator = "\\s*(?:-|,|until|au|to|à)\\s*";
    _this.dateIntervalStrPatterns = [];
    for (var i = 1; i < 10; i++) {
      if (typeof _this["datePattern" + i] === "function") {
        _this.dateIntervalStrPatterns.push("" + _this.intervalPrefix + _this['datePattern' + i]('from') + ("" + _this.intervalSeparator + _this['datePattern' + i]('to')));
      }
    }

    _this.dateIntervalsPatterns = new _xregexp2.default(_this.dateIntervalStrPatterns.join('|'), 'i');
    return _this;
  }

  (0, _createClass3.default)(ParseDateIntervals, [{
    key: "matchToDateInterval",
    value: function matchToDateInterval(match) {

      for (var i = 1; i < 10; i++) {
        if (match["year" + i + "from"] && match["month" + i + "from"] && match["year" + i + "from"] && match["month" + i + "to"]) {
          var dateFrom = new Date(this.matchToYears(match, i, 'from'), this.matchToMonths(match, i, 'from') - 1, this.matchToDays(match, i, 'from'));
          var dateTo = new Date(this.matchToYears(match, i, 'to'), this.matchToMonths(match, i, 'to') - 1, this.matchToDays(match, i, 'to'));
          return {
            from: {
              str: dateFrom.toString(),
              timestamp: +dateFrom,
              month: dateFrom.getMonth() + 1,
              date: dateFrom.getDate(),
              year: dateFrom.getFullYear()
            },
            to: {
              str: dateTo.toString(),
              timestamp: +dateTo,
              month: dateTo.getMonth() + 1,
              date: dateTo.getDate(),
              year: dateTo.getFullYear()
            }
          };
        }
      }
      throw new Error("couldn't find patterns");
    }
  }, {
    key: "parseDateIntervals",
    value: function parseDateIntervals(input) {
      var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var text = "";
      if (typeof input === 'string') {
        text = input;
      } else if (typeof input.text === 'string') {
        text = input.text;
      } else {
        return _promise2.default.reject(new Error("input is not text but " + (typeof input === "undefined" ? "undefined" : (0, _typeof3.default)(input))));
      }
      var match = _xregexp2.default.exec(text, this.dateIntervalsPatterns);

      //console.log(JSON.stringify(match));

      try {
        return _promise2.default.resolve(this.matchToDateInterval(match));
      } catch (err) {
        console.log("error: " + err);
        return _promise2.default.resolve(null);
      }
    }
  }]);
  return ParseDateIntervals;
}(_parseDates.ParseDates);

var singletonInstance = new ParseDateIntervals();
var singletonMethod = function singletonMethod() {
  return singletonInstance.parseDateIntervals.apply(singletonInstance, arguments);
};

module.exports = singletonMethod;
module.exports.default = singletonMethod;
module.exports.parseDateIntervals = singletonInstance;
module.exports.ParseDateIntervals = ParseDateIntervals;