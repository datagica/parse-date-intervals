Date interval parser

Can detect a date interval in a document. well, most of the time.


## Installation

    $ npm install --save @datagica/parse-date-intervals

## Usage

```javascript
import parseDateIntervals from "@datagica/parse-date-intervals";

parseDateIntervals(INPUT).then(result => {
  if (result == null) {
    console.log("not found")
  } else {
    console.log("found: ", result)
  }
}).catch(err => {
  console.log("invalid input data: "+err)
})
```

## Examples

```javascript
{
import parseDateIntervals from "@datagica/parse-date-intervals";


parseDateIntervals("from Apr 1 1985 to Apr 2 1990").then(..).catch(..)
// will output
{
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

parseDateIntervals("Mars 17th 1973 - Mars 7th 1976").then(..).catch(..)
// will output
{
  from: {
    str: 'Sat Mar 17 1973 00:00:00 GMT+0100 (CET)',
    timestamp: 101170800000,
    month: 3,
    date: 17,
    year: 1973
 },
 to: {
     str: 'Sun Mar 07 1976 00:00:00 GMT+0100 (CET)',
    timestamp: 195001200000,
    month: 3,
    date: 7,
    year: 1976
  }
}

parseDateIntervals("Mars 17 1973 à Mars 7 1976").then(..).catch(..)
// will output
{
  from: {
    str: 'Sat Mar 17 1973 00:00:00 GMT+0100 (CET)',
    timestamp: 101170800000,
    month: 3,
    date: 17,
    year: 1973
  },
  to: {
    str: 'Sun Mar 07 1976 00:00:00 GMT+0100 (CET)',
    timestamp: 195001200000,
    month: 3,
    date: 7,
    year: 1976
  }
}
```

# TODO
- interval date parser should support more text formats
- should support more languages, too
