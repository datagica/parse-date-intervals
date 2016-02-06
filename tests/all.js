const chai = require('chai');
chai.use(require('chai-fuzzy'));
const expect = chai.expect;

const parseDateIntervals = require("../lib/parse-date-intervals");

describe('@datagica/parse-date-intervals', () => {

  it('should extract date intervals', (done) => {
    Promise.all(
      [{ // believable french birth date
        input: "from Apr 1 1985 to Apr 2 1990",
        output: {
          from: {
            str: 'Mon Apr 01 1985 00:00:00 GMT+0200 (CEST)',
            timestamp: 481154400000,
            month: 4,
            date: 1,
            year: 1985
          },
          to: {
            str: 'Mon Apr 02 1990 00:00:00 GMT+0200 (CEST)',
            timestamp: 639007200000,
            month: 4,
            date: 2,
            year: 1990
          }
        }
      }, {
        input: "Mars 17th 1973 - Mars 7th 1976",
        output: { from:
      { str: 'Sat Mar 17 1973 00:00:00 GMT+0100 (CET)',
        timestamp: 101170800000,
        month: 3,
        date: 17,
        year: 1973 },
     to:
      { str: 'Sun Mar 07 1976 00:00:00 GMT+0100 (CET)',
        timestamp: 195001200000,
        month: 3,
        date: 7,
        year: 1976 } }
      }, {
        input: "Mars 17 1973 à Mars 7 1976",
        output: { from:
      { str: 'Sat Mar 17 1973 00:00:00 GMT+0100 (CET)',
        timestamp: 101170800000,
        month: 3,
        date: 17,
        year: 1973 },
     to:
      { str: 'Sun Mar 07 1976 00:00:00 GMT+0100 (CET)',
        timestamp: 195001200000,
        month: 3,
        date: 7,
        year: 1976 } }
      }].map(test => {
        return parseDateIntervals(test.input).then(output => {
          console.log("output: " + JSON.stringify(output));
          expect(output).to.be.like(test.output)
          return Promise.resolve(true)
        })
      })).then(finished => {
      done()
    }).catch(exc => {
      console.error(exc)
    })
  })
})
