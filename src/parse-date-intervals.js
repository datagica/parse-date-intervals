import {
  ParseDates
}
from "@datagica/parse-dates";
import XRegExp from "xregexp";

class ParseDateIntervals extends ParseDates {
  constructor(opts = {}) {
    super(opts);

    this.intervalPrefix = `(?:(?:de|from)?\\s+)?`;
    this.intervalSeparator = `\\s*(?:-|,|until|au|to|à)\\s*`;
    this.dateIntervalStrPatterns = [];
    for (let i = 1; i < 10; i++) {
      if (typeof this[`datePattern${i}`] === "function") {
        this.dateIntervalStrPatterns.push(
          `${this.intervalPrefix}${this['datePattern'+i]('from')}` +
          `${this.intervalSeparator}${this['datePattern'+i]('to')}`
        )
      }
    }

    this.dateIntervalsPatterns = new XRegExp(this.dateIntervalStrPatterns.join('|'), 'i')
  }

  matchToDateInterval(match) {

    for (let i = 1; i < 10; i++) {
      if (match[`year${i}from`] && match[`month${i}from`] &&
        match[`year${i}from`] && match[`month${i}to`]) {
        const dateFrom = new Date(
          this.matchToYears(match, i, 'from'),
          this.matchToMonths(match, i, 'from') - 1,
          this.matchToDays(match, i, 'from')
        );
        const dateTo = new Date(
          this.matchToYears(match, i, 'to'),
          this.matchToMonths(match, i, 'to') - 1,
          this.matchToDays(match, i, 'to')
        );
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
        }
      }
    }
    throw new Error("couldn't find patterns");
  }
  parseDateIntervals(input, opts = {}) {

    let text = "";
    if (typeof input === 'string') {
      text = input
    } else if (typeof input.text === 'string') {
      text = input.text
    } else {
      return Promise.reject(new Error(`input is not text but ${typeof input}`))
    }
    const match = XRegExp.exec(text, this.dateIntervalsPatterns);

    //console.log(JSON.stringify(match));

    try {
      return Promise.resolve(this.matchToDateInterval(match));
    } catch (err) {
      console.log("error: " + err);
      return Promise.resolve(null);
    }
  }
}

const singletonInstance = new ParseDateIntervals()
const singletonMethod = function(...opts) {
  return singletonInstance.parseDateIntervals(...opts)
}

module.exports = singletonMethod
module.exports.default = singletonMethod
module.exports.parseDateIntervals = singletonInstance
module.exports.ParseDateIntervals = ParseDateIntervals
