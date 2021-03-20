(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const edtf = require('edtf');
const input_field = document.getElementsByName('edtf_input')[0];
const lower_field = document.getElementsByName('edtf_lower')[0];
const upper_field = document.getElementsByName('edtf_upper')[0];
const error_div = document.getElementById('error_div');
const error_list = document.getElementById('input_errors');
const submit_btn = document.getElementById('convert_btn');

const n_values_entered_el = document.getElementById("n_values_entered");
const n_blanks_el = document.getElementById("n_blanks");
const n_errors_el = document.getElementById("n_errors");

var n_values_entered = 0;
var n_blanks = 0;
var n_errors = 0;

n_values_entered_el.textContent = n_values_entered;
n_blanks_el.textContent = n_blanks;
n_errors_el.textContent = n_errors;

const reset_metrics = function () {
  n_values_entered = 0
  n_blanks = 0
  n_errors = 0
}

const onlyDateToString = function (d) {
  return d.toISOString().substring(0, 10)
}

const show_errors = function (bool) {
  if (bool) {
    error_div.setAttribute("class", "error_list")
  } else {
    error_div.setAttribute("class", "error_list hidden")
  }
}

const parse_boundaries = function (edtf_string, i) {
  n_values_entered += 1;
  if (!!edtf_string) {
    try {
      const parsed_date = edtf(edtf_string);
      const bottom = new Date(parsed_date.min)
      const top = new Date(parsed_date.max)
      return { lower_date: onlyDateToString(bottom), upper_date: onlyDateToString(top) }
    }
    catch (e) {
      // When line is error, update errors
      var parse_error = document.createElement("li")
      parse_error.innerHTML = `line ${i + 1}: <code>${edtf_string}</code>`
      error_list.appendChild(parse_error)
      n_errors += 1;
    }
  }
  // When all else fails, return blank
  n_blanks += 1;
  return { lower_date: "", upper_date: "" }
}

const render_all_dates = function () {
  reset_metrics()
  show_errors(false)
  // Clear error list on update
  while (error_list.firstChild) {
    error_list.removeChild(error_list.firstChild);
  }
  const input_string = input_field.value
  var lower_dates = new Array
  var upper_dates = new Array
  input_string.split(/\r?\n/).forEach((e, i) => {
    const lims = parse_boundaries(e, i)
    lower_dates.push(lims.lower_date)
    upper_dates.push(lims.upper_date)
  })
  lower_field.value = lower_dates.join("\n")
  upper_field.value = upper_dates.join("\n")
  n_values_entered_el.textContent = n_values_entered;
  n_blanks_el.textContent = n_blanks;
  n_errors_el.textContent = n_errors;
  if (error_list.firstChild) {
    show_errors(true)
  }
}

submit_btn.onclick = render_all_dates;
},{"edtf":3}],2:[function(require,module,exports){
'use strict';
/* eslint indent: 4 */


// Private helper class
class SubRange {
    constructor(low, high) {
        this.low = low;
        this.high = high;
        this.length = 1 + high - low;
    }

    overlaps(range) {
        return !(this.high < range.low || this.low > range.high);
    }

    touches(range) {
        return !(this.high + 1 < range.low || this.low - 1 > range.high);
    }

    // Returns inclusive combination of SubRanges as a SubRange.
    add(range) {
        return new SubRange(
            Math.min(this.low, range.low),
            Math.max(this.high, range.high)
        );
    }

    // Returns subtraction of SubRanges as an array of SubRanges.
    // (There's a case where subtraction divides it in 2)
    subtract(range) {
        if (range.low <= this.low && range.high >= this.high) {
            return [];
        } else if (range.low > this.low && range.high < this.high) {
            return [
                new SubRange(this.low, range.low - 1),
                new SubRange(range.high + 1, this.high)
            ];
        } else if (range.low <= this.low) {
            return [new SubRange(range.high + 1, this.high)];
        } else {
            return [new SubRange(this.low, range.low - 1)];
        }
    }

    toString() {
        return this.low == this.high ?
            this.low.toString() : this.low + '-' + this.high;
    }
}


class DRange {
    constructor(a, b) {
        this.ranges = [];
        this.length = 0;
        if (a != null) this.add(a, b);
    }

    _update_length() {
        this.length = this.ranges.reduce((previous, range) => {
            return previous + range.length;
        }, 0);
    }

    add(a, b) {
        var _add = (subrange) => {
            var i = 0;
            while (i < this.ranges.length && !subrange.touches(this.ranges[i])) {
                i++;
            }
            var newRanges = this.ranges.slice(0, i);
            while (i < this.ranges.length && subrange.touches(this.ranges[i])) {
                subrange = subrange.add(this.ranges[i]);
                i++;
            }
            newRanges.push(subrange);
            this.ranges = newRanges.concat(this.ranges.slice(i));
            this._update_length();
        }

        if (a instanceof DRange) {
            a.ranges.forEach(_add);
        } else {
            if (b == null) b = a;
            _add(new SubRange(a, b));
        }
        return this;
    }

    subtract(a, b) {
        var _subtract = (subrange) => {
            var i = 0;
            while (i < this.ranges.length && !subrange.overlaps(this.ranges[i])) {
                i++;
            }
            var newRanges = this.ranges.slice(0, i);
            while (i < this.ranges.length && subrange.overlaps(this.ranges[i])) {
                newRanges = newRanges.concat(this.ranges[i].subtract(subrange));
                i++;
            }
            this.ranges = newRanges.concat(this.ranges.slice(i));
            this._update_length();
        };

        if (a instanceof DRange) {
            a.ranges.forEach(_subtract);
        } else {
            if (b == null) b = a;
            _subtract(new SubRange(a, b));
        }
        return this;
    }

    intersect(a, b) {
        var newRanges = [];
        var _intersect = (subrange) => {
            var i = 0;
            while (i < this.ranges.length && !subrange.overlaps(this.ranges[i])) {
                i++;
            }
            while (i < this.ranges.length && subrange.overlaps(this.ranges[i])) {
                var low = Math.max(this.ranges[i].low, subrange.low);
                var high = Math.min(this.ranges[i].high, subrange.high);
                newRanges.push(new SubRange(low, high));
                i++;
            }
        };

        if (a instanceof DRange) {
            a.ranges.forEach(_intersect);
        } else {
            if (b == null) b = a;
            _intersect(new SubRange(a, b));
        }
        this.ranges = newRanges;
        this._update_length();
        return this;
    }

    index(index) {
        var i = 0;
        while (i < this.ranges.length && this.ranges[i].length <= index) {
            index -= this.ranges[i].length;
            i++;
        }
        return this.ranges[i].low + index;
    }

    toString() {
        return '[ ' + this.ranges.join(', ') + ' ]';
    }

    clone() {
        return new DRange(this);
    }

    numbers() {
        return this.ranges.reduce((result, subrange) => {
            var i = subrange.low;
            while (i <= subrange.high) {
                result.push(i);
                i++;
            }
            return result;
        }, []);
    }

    subranges() {
        return this.ranges.map((subrange) => ({
            low: subrange.low,
            high: subrange.high,
            length: 1 + subrange.high - subrange.low
        }));
    }
}

module.exports = DRange;

},{}],3:[function(require,module,exports){
'use strict'

const edtf = require('./src/edtf')
const Bitmask = require('./src/bitmask')
const types = require('./src/types')
const { parse, defaults } = require('./src/parser')
const { format } = require('./src/format')

module.exports = Object.assign(edtf, types, {
  Bitmask,
  defaults,
  parse,
  format,
  get sample() {
    return require('./src/sample').sample
  },
  types: Object.keys(types)
})

},{"./src/bitmask":11,"./src/edtf":15,"./src/format":16,"./src/parser":22,"./src/sample":23,"./src/types":26}],4:[function(require,module,exports){
module.exports={
  "locale": "de-DE",

  "date": {
    "approximate": {
      "long": "circa %D",
      "medium": "ca. %D",
      "short": "ca. %D"
    },
    "uncertain": {
      "long": "%D (?)",
      "medium": "%D (?)",
      "short": "%D (?)"
    }
  }
}

},{}],5:[function(require,module,exports){
module.exports={
  "locale": "en-US",

  "date": {
    "approximate": {
      "long": "circa %D",
      "medium": "ca. %D",
      "short": "c. %D"
    },
    "uncertain": {
      "long": "%D (unspecified)",
      "medium": "%D (?)",
      "short": "%D (?)"
    }
  }
}

},{}],6:[function(require,module,exports){
module.exports={
  "locale": "es-ES",

  "date": {
    "approximate": {
      "long": "circa %D",
      "medium": "ca. %D",
      "short": "c. %D"
    },
    "uncertain": {
      "long": "%D (?)",
      "medium": "%D (?)",
      "short": "%D (?)"
    }
  }
}

},{}],7:[function(require,module,exports){
module.exports={
  "locale": "fr-FR",

  "date": {
    "approximate": {
      "long": "circa %D",
      "medium": "ca. %D",
      "short": "c. %D"
    },
    "uncertain": {
      "long": "%D (?)",
      "medium": "%D (?)",
      "short": "%D (?)"
    }
  }
}

},{}],8:[function(require,module,exports){
'use strict'

const locale = {}

locale.en = require('./en-US.json')
locale.es = require('./es-ES.json')
locale.de = require('./de-DE.json')
locale.fr = require('./fr-FR.json')
locale.it = require('./it-IT.json')
locale.ja = require('./ja-JA.json')

alias('en', 'AU', 'CA', 'GB', 'NZ', 'SA', 'US')
alias('de', 'AT', 'CH', 'DE')
alias('fr', 'CH', 'FR')

function alias(lc, ...args) {
  for (const ct of args) locale[`${lc}-${ct}`] = locale[lc]
}

module.exports = locale

},{"./de-DE.json":4,"./en-US.json":5,"./es-ES.json":6,"./fr-FR.json":7,"./it-IT.json":9,"./ja-JA.json":10}],9:[function(require,module,exports){
module.exports={
  "locale": "it-IT",

  "date": {
    "approximate": {
      "long": "circa %D",
      "medium": "ca. %D",
      "short": "c. %D"
    },
    "uncertain": {
      "long": "%D (?)",
      "medium": "%D (?)",
      "short": "%D (?)"
    }
  }
}

},{}],10:[function(require,module,exports){
module.exports={
  "locale": "ja-JA",

  "date": {
    "approximate": {
      "long": "%D頃",
      "medium": "%D頃",
      "short": "%D頃"
    },
    "uncertain": {
      "long": "%D頃",
      "medium": "%D頃",
      "short": "%D頃"
    }
  }
}

},{}],11:[function(require,module,exports){
'use strict'

const DAY = /^days?$/i
const MONTH = /^months?$/i
const YEAR = /^years?$/i
const SYMBOL = /^[xX]$/
const SYMBOLS = /[xX]/g
const PATTERN = /^[0-9xXdDmMyY]{8}$/
const YYYYMMDD = 'YYYYMMDD'.split('')
const MAXDAYS = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

const { floor, pow, max, min } = Math


/**
 * Bitmasks are used to set Unspecified, Uncertain and
 * Approximate flags for a Date. The bitmask for one
 * feature corresponds to a numeric value based on the
 * following pattern:
 *
 *           YYYYMMDD
 *           --------
 *   Day     00000011
 *   Month   00001100
 *   Year    11110000
 *
 */
class Bitmask {

  static test(a, b) {
    return this.convert(a) & this.convert(b)
  }

  static convert(value = 0) { // eslint-disable-line complexity
    value = value || 0

    if (value instanceof Bitmask) return value.value

    switch (typeof value) {
    case 'number': return value

    case 'boolean': return value ? Bitmask.YMD : 0

    case 'string':
      if (DAY.test(value)) return Bitmask.DAY
      if (MONTH.test(value)) return Bitmask.MONTH
      if (YEAR.test(value)) return Bitmask.YEAR
      if (PATTERN.test(value)) return Bitmask.compute(value)
      // fall through!

    default:
      throw new Error(`invalid value: ${value}`)
    }
  }

  static compute(value) {
    return value.split('').reduce((memo, c, idx) =>
      (memo | (SYMBOL.test(c) ? pow(2, idx) : 0)), 0)
  }

  static values(mask, digit = 0) {
    let num = Bitmask.numbers(mask, digit).split('')
    let values = [Number(num.slice(0, 4).join(''))]

    if (num.length > 4) values.push(Number(num.slice(4, 6).join('')))
    if (num.length > 6) values.push(Number(num.slice(6, 8).join('')))

    return Bitmask.normalize(values)
  }

  static numbers(mask, digit = 0) {
    return mask.replace(SYMBOLS, digit)
  }

  static normalize(values) {
    if (values.length > 1)
      values[1] = min(11, max(0, values[1] - 1))

    if (values.length > 2)
      values[2] = min(MAXDAYS[values[1]] || NaN, max(1, values[2]))

    return values
  }


  constructor(value = 0) {
    this.value = Bitmask.convert(value)
  }

  test(value = 0) {
    return this.value & Bitmask.convert(value)
  }

  bit(k) {
    return this.value & pow(2, k)
  }

  get day() { return this.test(Bitmask.DAY) }

  get month() { return this.test(Bitmask.MONTH) }

  get year() { return this.test(Bitmask.YEAR) }


  add(value) {
    return (this.value = this.value | Bitmask.convert(value)), this
  }

  set(value = 0) {
    return (this.value = Bitmask.convert(value)), this
  }

  mask(input = YYYYMMDD, offset = 0, symbol = 'X') {
    return input.map((c, idx) => this.bit(offset + idx) ? symbol : c)
  }

  masks(values, symbol = 'X') {
    let offset = 0

    return values.map(value => {
      let mask = this.mask(value.split(''), offset, symbol)
      offset = offset + mask.length

      return mask.join('')
    })
  }

  // eslint-disable-next-line complexity
  max([year, month, day]) {
    if (!year) return []

    year = Number(
      (this.test(Bitmask.YEAR)) ? this.masks([year], '9')[0] : year
    )

    if (!month) return [year]

    month = Number(month) - 1

    switch (this.test(Bitmask.MONTH)) {
    case Bitmask.MONTH:
      month = 11
      break
    case Bitmask.MX:
      month = (month < 9) ? 8 : 11
      break
    case Bitmask.XM:
      month = (month + 1) % 10
      month = (month < 3) ? month + 9 : month - 1
      break
    }

    if (!day) return [year, month]

    day = Number(day)

    switch (this.test(Bitmask.DAY)) {
    case Bitmask.DAY:
      day = MAXDAYS[month]
      break
    case Bitmask.DX:
      day = min(MAXDAYS[month], day + (9 - (day % 10)))
      break
    case Bitmask.XD:
      day = day % 10

      if (month === 1) {
        day = (day === 9 && !leap(year)) ? day + 10 : day + 20

      } else {
        day = (day < 2) ? day + 30 : day + 20
        if (day > MAXDAYS[month]) day = day - 10
      }

      break
    }

    if (month === 1 && day > 28 && !leap(year)) {
      day = 28
    }

    return [year, month, day]
  }

  // eslint-disable-next-line complexity
  min([year, month, day]) {
    if (!year) return []

    year = Number(
      (this.test(Bitmask.YEAR)) ? this.masks([year], '0')[0] : year
    )

    if (month == null) return [year]

    month = Number(month) - 1

    switch (this.test(Bitmask.MONTH)) {
    case Bitmask.MONTH:
    case Bitmask.XM:
      month = 0
      break
    case Bitmask.MX:
      month = (month < 9) ? 0 : 9
      break
    }

    if (!day) return [year, month]

    day = Number(day)

    switch (this.test(Bitmask.DAY)) {
    case Bitmask.DAY:
      day = 1
      break
    case Bitmask.DX:
      day = max(1, floor(day / 10) * 10)
      break
    case Bitmask.XD:
      day = max(1, day % 10)
      break
    }

    return [year, month, day]
  }

  marks(values, symbol = '?') {
    return values
      .map((value, idx) => [
        this.qualified(idx * 2) ? symbol : '',
        value,
        this.qualified(idx * 2 + 1) ? symbol : ''
      ].join(''))
  }

  qualified(idx) { // eslint-disable-line complexity
    switch (idx) {
    case 1:
      return this.value === Bitmask.YEAR ||
        (this.value & Bitmask.YEAR) && !(this.value & Bitmask.MONTH)
    case 2:
      return this.value === Bitmask.MONTH ||
        (this.value & Bitmask.MONTH) && !(this.value & Bitmask.YEAR)
    case 3:
      return this.value === Bitmask.YM
    case 4:
      return this.value === Bitmask.DAY ||
        (this.value & Bitmask.DAY) && (this.value !== Bitmask.YMD)
    case 5:
      return this.value === Bitmask.YMD
    default:
      return false
    }
  }

  qualify(idx) {
    return (this.value = this.value | Bitmask.UA[idx]), this
  }

  toJSON() {
    return this.value
  }

  toString(symbol = 'X') {
    return this.masks(['YYYY', 'MM', 'DD'], symbol).join('-')
  }
}

Bitmask.prototype.is = Bitmask.prototype.test

function leap(year) {
  if (year % 4 > 0) return false
  if (year % 100 > 0) return true
  if (year % 400 > 0) return false
  return true
}

Bitmask.DAY   = Bitmask.D = Bitmask.compute('yyyymmxx')
Bitmask.MONTH = Bitmask.M = Bitmask.compute('yyyyxxdd')
Bitmask.YEAR  = Bitmask.Y = Bitmask.compute('xxxxmmdd')

Bitmask.MD  = Bitmask.M | Bitmask.D
Bitmask.YMD = Bitmask.Y | Bitmask.MD
Bitmask.YM  = Bitmask.Y | Bitmask.M

Bitmask.YYXX = Bitmask.compute('yyxxmmdd')
Bitmask.YYYX = Bitmask.compute('yyyxmmdd')
Bitmask.XXXX = Bitmask.compute('xxxxmmdd')

Bitmask.DX = Bitmask.compute('yyyymmdx')
Bitmask.XD = Bitmask.compute('yyyymmxd')
Bitmask.MX = Bitmask.compute('yyyymxdd')
Bitmask.XM = Bitmask.compute('yyyyxmdd')

/*
 * Map each UA symbol position to a mask.
 *
 *   ~YYYY~-~MM~-~DD~
 *   0    1 2  3 4  5
 */
Bitmask.UA = [
  Bitmask.YEAR,
  Bitmask.YEAR,   // YEAR !DAY
  Bitmask.MONTH,
  Bitmask.YM,
  Bitmask.DAY,    // YEARDAY
  Bitmask.YMD
]

module.exports = Bitmask

},{}],12:[function(require,module,exports){
'use strict'

const assert = require('assert')
const ExtDate = require('./date')
const ExtDateTime = require('./interface')
const { abs, floor } = Math

const V = new WeakMap()

class Century extends ExtDateTime {
  constructor(input) {
    super()

    V.set(this, [])

    this.uncertain = false
    this.approximate = false

    switch (typeof input) {
    case 'number':
      this.century = input
      break

    case 'string':
      input = Century.parse(input)
      // eslint-disable-line no-fallthrough

    case 'object':
      if (Array.isArray(input))
        input = { values: input }

      {
        assert(input !== null)
        if (input.type) assert.equal('Century', input.type)

        assert(input.values)
        assert(input.values.length === 1)

        this.century = input.values[0]
        this.uncertain = !!input.uncertain
        this.approximate = !!input.approximate
      }
      break

    case 'undefined':
      this.year = new Date().getUTCFullYear()
      break

    default:
      throw new RangeError('Invalid century value')
    }
  }

  get century() {
    return this.values[0]
  }

  set century(century) {
    century = floor(Number(century))
    assert(abs(century) < 100, `invalid century: ${century}`)
    this.values[0] = century
  }

  get year() {
    return this.values[0] * 100
  }

  set year(year) {
    this.century = year / 100
  }

  get values() {
    return V.get(this)
  }

  get min() {
    return ExtDate.UTC(this.year, 0)
  }

  get max() {
    return ExtDate.UTC(this.year + 100, 0) - 1
  }

  toEDTF() {
    let century = Century.pad(this.century)

    if (this.uncertain)
      century = century + '?'

    if (this.approximate)
      century = (century + '~').replace(/\?~/, '%')

    return century
  }

  static pad(number) {
    let k = abs(number)
    let sign = (k === number) ? '' : '-'

    if (k < 10)   return `${sign}0${k}`

    return `${number}`
  }
}

module.exports = Century

},{"./date":13,"./interface":18,"assert":36}],13:[function(require,module,exports){
(function (global){(function (){
'use strict'

const assert = require('assert')

const Bitmask = require('./bitmask')
const ExtDateTime = require('./interface')
const mixin = require('./mixin')
const { format } = require('./format')

const { abs } = Math
const { isArray } = Array

const P = new WeakMap()
const U = new WeakMap()
const A = new WeakMap()
const X = new WeakMap()

const PM = [Bitmask.YMD, Bitmask.Y, Bitmask.YM, Bitmask.YMD]

class Date extends global.Date {
  constructor(...args) { // eslint-disable-line complexity
    let precision = 0
    let uncertain, approximate, unspecified

    switch (args.length) {
    case 0:
      break

    case 1:
      switch (typeof args[0]) {
      case 'number':
        break

      case 'string':
        args = [Date.parse(args[0])]
        // eslint-disable-line no-fallthrough

      case 'object':
        if (isArray(args[0]))
          args[0] = { values: args[0] }

        {
          let obj = args[0]

          assert(obj != null)
          if (obj.type) assert.equal('Date', obj.type)

          if (obj.values && obj.values.length) {
            precision = obj.values.length
            args = obj.values.slice()

            // ECMA Date constructor needs at least two date parts!
            if (args.length < 2) args.push(0)

            if (obj.offset) {
              if (args.length < 3) args.push(1)
              while (args.length < 5) args.push(0)

              // ECMA Date constructor handles overflows so we
              // simply add the offset!
              args[4] = args[4] + obj.offset
            }

            args = [ExtDateTime.UTC(...args)]
          }

          ({ uncertain, approximate, unspecified } = obj)
        }
        break

      default:
        throw new RangeError('Invalid time value')
      }

      break

    default:
      precision = args.length
    }

    super(...args)

    this.precision = precision

    this.uncertain = uncertain
    this.approximate = approximate
    this.unspecified = unspecified
  }

  set precision(value) {
    P.set(this, (value > 3) ? 0 : Number(value))
  }

  get precision() {
    return P.get(this)
  }

  set uncertain(value) {
    U.set(this, this.bits(value))
  }

  get uncertain() {
    return U.get(this)
  }

  set approximate(value) {
    A.set(this, this.bits(value))
  }

  get approximate() {
    return A.get(this)
  }

  set unspecified(value) {
    X.set(this, new Bitmask(value))
  }

  get unspecified() {
    return X.get(this)
  }

  get atomic() {
    return !(
      this.precision || this.unspecified.value
    )
  }

  get min() {
    // TODO uncertain and approximate

    if (this.unspecified.value && this.year < 0) {
      let values = this.unspecified.max(this.values.map(Date.pad))
      values[0] = -values[0]
      return (new Date({ values })).getTime()
    }

    return this.getTime()
  }

  get max() {
    // TODO uncertain and approximate
    return (this.atomic) ? this.getTime() : this.next().getTime() - 1
  }

  get year() {
    return this.getUTCFullYear()
  }

  get month() {
    return this.getUTCMonth()
  }

  get date() {
    return this.getUTCDate()
  }

  get hours() {
    return this.getUTCHours()
  }

  get minutes() {
    return this.getUTCMinutes()
  }

  get seconds() {
    return this.getUTCSeconds()
  }

  get values() {
    switch (this.precision) {
    case 1:
      return [this.year]
    case 2:
      return [this.year, this.month]
    case 3:
      return [this.year, this.month, this.date]
    default:
      return [
        this.year, this.month, this.date, this.hours, this.minutes, this.seconds
      ]
    }
  }

  /**
   * Returns the next second, day, month, or year, depending on
   * the current date's precision. Uncertain, approximate and
   * unspecified masks are copied.
   */
  next(k = 1) {
    let { values, unspecified, uncertain, approximate } = this

    if (unspecified.value) {
      let bc = values[0] < 0

      values = (k < 0) ^ bc ?
        unspecified.min(values.map(Date.pad)) :
        unspecified.max(values.map(Date.pad))

      if (bc) values[0] = -values[0]
    }

    values.push(values.pop() + k)

    return new Date({ values, unspecified, uncertain, approximate })
  }

  prev(k = 1) {
    return this.next(-k)
  }

  *[Symbol.iterator]() {
    let cur = this

    while (cur <= this.max) {
      yield cur
      cur = cur.next()
    }
  }

  toEDTF() {
    if (!this.precision) return this.toISOString()

    let sign = (this.year < 0) ? '-' : ''
    let values = this.values.map(Date.pad)

    if (this.unspecified.value)
      return sign + this.unspecified.masks(values).join('-')

    if (this.uncertain.value)
      values = this.uncertain.marks(values, '?')

    if (this.approximate.value) {
      values = this.approximate.marks(values, '~')
        .map(value => value.replace(/(~\?)|(\?~)/, '%'))
    }

    return  sign + values.join('-')
  }

  format(...args) {
    return format(this, ...args)
  }

  static pad(number, idx = 0) {
    if (!idx) { // idx 0 = year, 1 = month, ...
      let k = abs(number)

      if (k < 10)   return `000${k}`
      if (k < 100)  return `00${k}`
      if (k < 1000) return `0${k}`

      return `${k}`
    }

    if (idx === 1) number = number + 1

    return (number < 10) ? `0${number}` : `${number}`
  }

  bits(value) {
    if (value === true)
      value = PM[this.precision]

    return new Bitmask(value)
  }
}

mixin(Date, ExtDateTime)

module.exports = Date

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./bitmask":11,"./format":16,"./interface":18,"./mixin":21,"assert":36}],14:[function(require,module,exports){
'use strict'

const assert = require('assert')
const ExtDate = require('./date')
const ExtDateTime = require('./interface')
const { abs, floor } = Math

const V = new WeakMap()


class Decade extends ExtDateTime {
  constructor(input) {
    super()

    V.set(this, [])

    this.uncertain = false
    this.approximate = false

    switch (typeof input) {
    case 'number':
      this.decade = input
      break

    case 'string':
      input = Decade.parse(input)
      // eslint-disable-line no-fallthrough

    case 'object':
      if (Array.isArray(input))
        input = { values: input }

      {
        assert(input !== null)
        if (input.type) assert.equal('Decade', input.type)

        assert(input.values)
        assert(input.values.length === 1)

        this.decade = input.values[0]
        this.uncertain = !!input.uncertain
        this.approximate = !!input.approximate
      }
      break

    case 'undefined':
      this.year = new Date().getUTCFullYear()
      break

    default:
      throw new RangeError('Invalid decade value')
    }
  }

  get decade() {
    return this.values[0]
  }

  set decade(decade) {
    decade = floor(Number(decade))
    assert(abs(decade) < 1000, `invalid decade: ${decade}`)
    this.values[0] = decade
  }

  get year() {
    return this.values[0] * 10
  }

  set year(year) {
    this.decade = year / 10
  }

  get values() {
    return V.get(this)
  }

  get min() {
    return ExtDate.UTC(this.year, 0)
  }

  get max() {
    return ExtDate.UTC(this.year + 10, 0) - 1
  }

  toEDTF() {
    let decade = Decade.pad(this.decade)

    if (this.uncertain)
      decade = decade + '?'

    if (this.approximate)
      decade = (decade + '~').replace(/\?~/, '%')

    return decade
  }

  static pad(number) {
    let k = abs(number)
    let sign = (k === number) ? '' : '-'

    if (k < 10)   return `${sign}00${k}`
    if (k < 100)  return `${sign}0${k}`

    return `${number}`
  }
}

module.exports = Decade

},{"./date":13,"./interface":18,"assert":36}],15:[function(require,module,exports){
'use strict'

const types = require('./types')
const { parse } = require('./parser')

const UNIX_TIME = /^\d{5,}$/

function edtf(...args) {
  if (!args.length)
    return new types.Date()

  if (args.length === 1) {
    switch (typeof args[0]) {
    case 'object':
      return new (types[args[0].type] || types.Date)(args[0])
    case 'number':
      return new types.Date(args[0])
    case 'string':
      if ((UNIX_TIME).test(args[0]))
        return new types.Date(Number(args[0]))
    }
  }

  let res = parse(...args)
  return new types[res.type](res)
}

module.exports = edtf

},{"./parser":22,"./types":26}],16:[function(require,module,exports){
'use strict'

const { assign } = Object
const LC = require('../locale-data')

const noTime = {
  timeZone: 'UTC',
  timeZoneName: undefined,
  hour: undefined,
  minute: undefined,
  second: undefined
}

const DEFAULTS = [
  {},
  assign({ weekday: undefined, day: undefined, month: undefined }, noTime),
  assign({ weekday: undefined, day: undefined }, noTime),
  assign({}, noTime),
]


function getCacheId(...args) {
  let id = []

  for (let arg of args) {
    if (arg && typeof arg === 'object') {
      id.push(getOrderedProps(arg))
    } else {
      id.push(arg)
    }
  }

  return JSON.stringify(id)

}

function getOrderedProps(obj) {
  let props = []
  let keys = Object.getOwnPropertyNames(obj)

  for (let key of keys.sort()) {
    props.push({ [key]: obj[key] })
  }

  return props
}

function getFormat(date, locale, options) {
  let opts = {}

  switch (date.precision) {
  case 3:
    opts.day = 'numeric'
    // eslint-disable-next-line no-fallthrough
  case 2:
    opts.month = 'numeric'
    // eslint-disable-next-line no-fallthrough
  case 1:
    opts.year = 'numeric'
    break
  }

  assign(opts, options, DEFAULTS[date.precision])

  let id = getCacheId(locale, opts)

  if (!format.cache.has(id)) {
    format.cache.set(id, new Intl.DateTimeFormat(locale, opts))
  }

  return format.cache.get(id)
}

function getPatternsFor(fmt) {
  const { locale, weekday, month, year } = fmt.resolvedOptions()
  const lc = LC[locale]

  if (lc == null) return null

  const variant = (weekday || month === 'long') ? 'long' :
    (!month || year === '2-digit') ? 'short' : 'medium'

  return {
    approximate: lc.date.approximate[variant],
    uncertain: lc.date.uncertain[variant]
  }
}

function isDMY(type) {
  return type === 'day' || type === 'month' || type === 'year'
}

function mask(date, parts) {
  let string = ''

  for (let { type, value } of parts) {
    string += (isDMY(type) && date.unspecified.is(type)) ?
      value.replace(/./g, 'X') :
      value
  }

  return string
}

function format(date, locale = 'en-US', options = {}) {
  const fmt = getFormat(date, locale, options)
  const pat = getPatternsFor(fmt)

  if (!date.isEDTF || pat == null) {
    return fmt.format(date)
  }

  let string = (!date.unspecified.value || !fmt.formatToParts) ?
    fmt.format(date) :
    mask(date, fmt.formatToParts(date))


  if (date.approximate.value) {
    string = pat.approximate.replace('%D', string)
  }

  if (date.uncertain.value) {
    string = pat.uncertain.replace('%D', string)
  }

  return string
}

format.cache = new Map()


module.exports = {
  getFormat,
  format
}

},{"../locale-data":8}],17:[function(require,module,exports){
// Generated automatically by nearley, version 2.19.7
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

  const {
    num, zero, nothing, pick, pluck, join, concat, merge, century,
    interval, list, masked, date, datetime, season, qualify, year, decade
  } = require('./util')

  const {
    DAY, MONTH, YEAR, YMD, YM, MD, YYXX, YYYX, XXXX
  } = require('./bitmask')
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "edtf", "symbols": ["L0"], "postprocess": id},
    {"name": "edtf", "symbols": ["L1"], "postprocess": id},
    {"name": "edtf", "symbols": ["L2"], "postprocess": id},
    {"name": "edtf", "symbols": ["L3"], "postprocess": id},
    {"name": "L0", "symbols": ["date_time"], "postprocess": id},
    {"name": "L0", "symbols": ["century"], "postprocess": id},
    {"name": "L0", "symbols": ["L0i"], "postprocess": id},
    {"name": "L0i", "symbols": ["date_time", {"literal":"/"}, "date_time"], "postprocess": interval(0)},
    {"name": "century", "symbols": ["positive_century"], "postprocess": data => century(data[0])},
    {"name": "century$string$1", "symbols": [{"literal":"0"}, {"literal":"0"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "century", "symbols": ["century$string$1"], "postprocess": data => century(0)},
    {"name": "century", "symbols": [{"literal":"-"}, "positive_century"], "postprocess": data => century(-data[1])},
    {"name": "positive_century", "symbols": ["positive_digit", "digit"], "postprocess": num},
    {"name": "positive_century", "symbols": [{"literal":"0"}, "positive_digit"], "postprocess": num},
    {"name": "date_time", "symbols": ["date"], "postprocess": id},
    {"name": "date_time", "symbols": ["datetime"], "postprocess": id},
    {"name": "date", "symbols": ["year"], "postprocess": data => date(data)},
    {"name": "date", "symbols": ["year_month"], "postprocess": data => date(data[0])},
    {"name": "date", "symbols": ["year_month_day"], "postprocess": data => date(data[0])},
    {"name": "year", "symbols": ["positive_year"], "postprocess": id},
    {"name": "year", "symbols": ["negative_year"], "postprocess": id},
    {"name": "year$string$1", "symbols": [{"literal":"0"}, {"literal":"0"}, {"literal":"0"}, {"literal":"0"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "year", "symbols": ["year$string$1"], "postprocess": join},
    {"name": "positive_year", "symbols": ["positive_digit", "digit", "digit", "digit"], "postprocess": join},
    {"name": "positive_year", "symbols": [{"literal":"0"}, "positive_digit", "digit", "digit"], "postprocess": join},
    {"name": "positive_year$string$1", "symbols": [{"literal":"0"}, {"literal":"0"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "positive_year", "symbols": ["positive_year$string$1", "positive_digit", "digit"], "postprocess": join},
    {"name": "positive_year$string$2", "symbols": [{"literal":"0"}, {"literal":"0"}, {"literal":"0"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "positive_year", "symbols": ["positive_year$string$2", "positive_digit"], "postprocess": join},
    {"name": "negative_year", "symbols": [{"literal":"-"}, "positive_year"], "postprocess": join},
    {"name": "year_month", "symbols": ["year", {"literal":"-"}, "month"], "postprocess": pick(0, 2)},
    {"name": "year_month_day", "symbols": ["year", {"literal":"-"}, "month_day"], "postprocess": pick(0, 2)},
    {"name": "month", "symbols": ["d01_12"], "postprocess": id},
    {"name": "month_day", "symbols": ["m31", {"literal":"-"}, "day"], "postprocess": pick(0, 2)},
    {"name": "month_day", "symbols": ["m30", {"literal":"-"}, "d01_30"], "postprocess": pick(0, 2)},
    {"name": "month_day$string$1", "symbols": [{"literal":"0"}, {"literal":"2"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "month_day", "symbols": ["month_day$string$1", {"literal":"-"}, "d01_29"], "postprocess": pick(0, 2)},
    {"name": "day", "symbols": ["d01_31"], "postprocess": id},
    {"name": "datetime$ebnf$1$subexpression$1", "symbols": ["timezone"], "postprocess": id},
    {"name": "datetime$ebnf$1", "symbols": ["datetime$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "datetime$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "datetime", "symbols": ["year_month_day", {"literal":"T"}, "time", "datetime$ebnf$1"], "postprocess": datetime},
    {"name": "time", "symbols": ["hours", {"literal":":"}, "minutes", {"literal":":"}, "seconds", "milliseconds"], "postprocess": pick(0, 2, 4, 5)},
    {"name": "time", "symbols": ["hours", {"literal":":"}, "minutes"], "postprocess": pick(0, 2)},
    {"name": "time$string$1", "symbols": [{"literal":"2"}, {"literal":"4"}, {"literal":":"}, {"literal":"0"}, {"literal":"0"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "time$ebnf$1$string$1", "symbols": [{"literal":":"}, {"literal":"0"}, {"literal":"0"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "time$ebnf$1", "symbols": ["time$ebnf$1$string$1"], "postprocess": id},
    {"name": "time$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "time", "symbols": ["time$string$1", "time$ebnf$1"], "postprocess": () => [24, 0, 0]},
    {"name": "hours", "symbols": ["d00_23"], "postprocess": num},
    {"name": "minutes", "symbols": ["d00_59"], "postprocess": num},
    {"name": "seconds", "symbols": ["d00_59"], "postprocess": num},
    {"name": "milliseconds", "symbols": []},
    {"name": "milliseconds", "symbols": [{"literal":"."}, "d3"], "postprocess": data => num(data.slice(1))},
    {"name": "timezone", "symbols": [{"literal":"Z"}], "postprocess": zero},
    {"name": "timezone$subexpression$1", "symbols": [{"literal":"-"}]},
    {"name": "timezone$subexpression$1", "symbols": [{"literal":"−"}]},
    {"name": "timezone", "symbols": ["timezone$subexpression$1", "offset"], "postprocess": data => -data[1]},
    {"name": "timezone", "symbols": [{"literal":"+"}, "positive_offset"], "postprocess": pick(1)},
    {"name": "positive_offset", "symbols": ["offset"], "postprocess": id},
    {"name": "positive_offset$string$1", "symbols": [{"literal":"0"}, {"literal":"0"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "positive_offset$ebnf$1", "symbols": [{"literal":":"}], "postprocess": id},
    {"name": "positive_offset$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "positive_offset$string$2", "symbols": [{"literal":"0"}, {"literal":"0"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "positive_offset", "symbols": ["positive_offset$string$1", "positive_offset$ebnf$1", "positive_offset$string$2"], "postprocess": zero},
    {"name": "positive_offset$subexpression$1$string$1", "symbols": [{"literal":"1"}, {"literal":"2"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "positive_offset$subexpression$1", "symbols": ["positive_offset$subexpression$1$string$1"]},
    {"name": "positive_offset$subexpression$1$string$2", "symbols": [{"literal":"1"}, {"literal":"3"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "positive_offset$subexpression$1", "symbols": ["positive_offset$subexpression$1$string$2"]},
    {"name": "positive_offset$ebnf$2", "symbols": [{"literal":":"}], "postprocess": id},
    {"name": "positive_offset$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "positive_offset", "symbols": ["positive_offset$subexpression$1", "positive_offset$ebnf$2", "minutes"], "postprocess": data => num(data[0]) * 60 + data[2]},
    {"name": "positive_offset$string$3", "symbols": [{"literal":"1"}, {"literal":"4"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "positive_offset$ebnf$3", "symbols": [{"literal":":"}], "postprocess": id},
    {"name": "positive_offset$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "positive_offset$string$4", "symbols": [{"literal":"0"}, {"literal":"0"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "positive_offset", "symbols": ["positive_offset$string$3", "positive_offset$ebnf$3", "positive_offset$string$4"], "postprocess": () => 840},
    {"name": "positive_offset", "symbols": ["d00_14"], "postprocess": data => num(data[0]) * 60},
    {"name": "offset$ebnf$1", "symbols": [{"literal":":"}], "postprocess": id},
    {"name": "offset$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "offset", "symbols": ["d01_11", "offset$ebnf$1", "minutes"], "postprocess": data => num(data[0]) * 60 + data[2]},
    {"name": "offset$string$1", "symbols": [{"literal":"0"}, {"literal":"0"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "offset$ebnf$2", "symbols": [{"literal":":"}], "postprocess": id},
    {"name": "offset$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "offset", "symbols": ["offset$string$1", "offset$ebnf$2", "d01_59"], "postprocess": data => num(data[2])},
    {"name": "offset$string$2", "symbols": [{"literal":"1"}, {"literal":"2"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "offset$ebnf$3", "symbols": [{"literal":":"}], "postprocess": id},
    {"name": "offset$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "offset$string$3", "symbols": [{"literal":"0"}, {"literal":"0"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "offset", "symbols": ["offset$string$2", "offset$ebnf$3", "offset$string$3"], "postprocess": () => 720},
    {"name": "offset", "symbols": ["d01_12"], "postprocess": data => num(data[0]) * 60},
    {"name": "L1", "symbols": ["L1d"], "postprocess": id},
    {"name": "L1", "symbols": ["L1Y"], "postprocess": id},
    {"name": "L1", "symbols": ["L1S"], "postprocess": id},
    {"name": "L1", "symbols": ["L1i"], "postprocess": id},
    {"name": "L1d", "symbols": ["date_ua"], "postprocess": id},
    {"name": "L1d", "symbols": ["L1X"], "postprocess": merge(0, { type: 'Date', level: 1 })},
    {"name": "date_ua", "symbols": ["date", "UA"], "postprocess": merge(0, 1, { level: 1 })},
    {"name": "L1i", "symbols": ["L1i_date", {"literal":"/"}, "L1i_date"], "postprocess": interval(1)},
    {"name": "L1i", "symbols": ["date_time", {"literal":"/"}, "L1i_date"], "postprocess": interval(1)},
    {"name": "L1i", "symbols": ["L1i_date", {"literal":"/"}, "date_time"], "postprocess": interval(1)},
    {"name": "L1i_date", "symbols": [], "postprocess": nothing},
    {"name": "L1i_date", "symbols": ["date_ua"], "postprocess": id},
    {"name": "L1i_date", "symbols": ["INFINITY"], "postprocess": id},
    {"name": "INFINITY$string$1", "symbols": [{"literal":"."}, {"literal":"."}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "INFINITY", "symbols": ["INFINITY$string$1"], "postprocess": () => Infinity},
    {"name": "L1X$string$1", "symbols": [{"literal":"-"}, {"literal":"X"}, {"literal":"X"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "L1X", "symbols": ["nd4", {"literal":"-"}, "md", "L1X$string$1"], "postprocess": masked()},
    {"name": "L1X$string$2", "symbols": [{"literal":"-"}, {"literal":"X"}, {"literal":"X"}, {"literal":"-"}, {"literal":"X"}, {"literal":"X"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "L1X", "symbols": ["nd4", "L1X$string$2"], "postprocess": masked()},
    {"name": "L1X$string$3", "symbols": [{"literal":"X"}, {"literal":"X"}, {"literal":"X"}, {"literal":"X"}, {"literal":"-"}, {"literal":"X"}, {"literal":"X"}, {"literal":"-"}, {"literal":"X"}, {"literal":"X"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "L1X", "symbols": ["L1X$string$3"], "postprocess": masked()},
    {"name": "L1X$string$4", "symbols": [{"literal":"-"}, {"literal":"X"}, {"literal":"X"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "L1X", "symbols": ["nd4", "L1X$string$4"], "postprocess": masked()},
    {"name": "L1X$string$5", "symbols": [{"literal":"X"}, {"literal":"X"}, {"literal":"X"}, {"literal":"X"}, {"literal":"-"}, {"literal":"X"}, {"literal":"X"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "L1X", "symbols": ["L1X$string$5"], "postprocess": masked()},
    {"name": "L1X$string$6", "symbols": [{"literal":"X"}, {"literal":"X"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "L1X", "symbols": ["nd2", "L1X$string$6"], "postprocess": masked()},
    {"name": "L1X", "symbols": ["nd3", {"literal":"X"}], "postprocess": masked()},
    {"name": "L1X$string$7", "symbols": [{"literal":"X"}, {"literal":"X"}, {"literal":"X"}, {"literal":"X"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "L1X", "symbols": ["L1X$string$7"], "postprocess": masked()},
    {"name": "L1Y", "symbols": [{"literal":"Y"}, "d5+"], "postprocess": data => year([num(data[1])], 1)},
    {"name": "L1Y$string$1", "symbols": [{"literal":"Y"}, {"literal":"-"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "L1Y", "symbols": ["L1Y$string$1", "d5+"], "postprocess": data => year([-num(data[1])], 1)},
    {"name": "UA", "symbols": [{"literal":"?"}], "postprocess": () => ({ uncertain: true })},
    {"name": "UA", "symbols": [{"literal":"~"}], "postprocess": () => ({ approximate: true })},
    {"name": "UA", "symbols": [{"literal":"%"}], "postprocess": () => ({ approximate: true, uncertain: true })},
    {"name": "L1S", "symbols": ["year", {"literal":"-"}, "d21_24"], "postprocess": data => season(data, 1)},
    {"name": "L2", "symbols": ["L2d"], "postprocess": id},
    {"name": "L2", "symbols": ["L2Y"], "postprocess": id},
    {"name": "L2", "symbols": ["L2S"], "postprocess": id},
    {"name": "L2", "symbols": ["L2D"], "postprocess": id},
    {"name": "L2", "symbols": ["L2i"], "postprocess": id},
    {"name": "L2", "symbols": ["set"], "postprocess": id},
    {"name": "L2", "symbols": ["list"], "postprocess": id},
    {"name": "L2d", "symbols": ["ua_date"], "postprocess": id},
    {"name": "L2d", "symbols": ["L2X"], "postprocess": merge(0, { type: 'Date', level: 2 })},
    {"name": "L2D", "symbols": ["decade"], "postprocess": id},
    {"name": "L2D", "symbols": ["decade", "UA"], "postprocess": merge(0, 1)},
    {"name": "ua_date", "symbols": ["ua_year"], "postprocess": qualify},
    {"name": "ua_date", "symbols": ["ua_year_month"], "postprocess": qualify},
    {"name": "ua_date", "symbols": ["ua_year_month_day"], "postprocess": qualify},
    {"name": "ua_year", "symbols": ["UA", "year"], "postprocess": data => [data]},
    {"name": "ua_year_month$macrocall$2", "symbols": ["year"]},
    {"name": "ua_year_month$macrocall$1$ebnf$1", "symbols": ["UA"], "postprocess": id},
    {"name": "ua_year_month$macrocall$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "ua_year_month$macrocall$1$ebnf$2", "symbols": ["UA"], "postprocess": id},
    {"name": "ua_year_month$macrocall$1$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "ua_year_month$macrocall$1", "symbols": ["ua_year_month$macrocall$1$ebnf$1", "ua_year_month$macrocall$2", "ua_year_month$macrocall$1$ebnf$2"]},
    {"name": "ua_year_month$macrocall$4", "symbols": ["month"]},
    {"name": "ua_year_month$macrocall$3$ebnf$1", "symbols": ["UA"], "postprocess": id},
    {"name": "ua_year_month$macrocall$3$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "ua_year_month$macrocall$3$ebnf$2", "symbols": ["UA"], "postprocess": id},
    {"name": "ua_year_month$macrocall$3$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "ua_year_month$macrocall$3", "symbols": ["ua_year_month$macrocall$3$ebnf$1", "ua_year_month$macrocall$4", "ua_year_month$macrocall$3$ebnf$2"]},
    {"name": "ua_year_month", "symbols": ["ua_year_month$macrocall$1", {"literal":"-"}, "ua_year_month$macrocall$3"], "postprocess": pluck(0, 2)},
    {"name": "ua_year_month_day$macrocall$2", "symbols": ["year"]},
    {"name": "ua_year_month_day$macrocall$1$ebnf$1", "symbols": ["UA"], "postprocess": id},
    {"name": "ua_year_month_day$macrocall$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "ua_year_month_day$macrocall$1$ebnf$2", "symbols": ["UA"], "postprocess": id},
    {"name": "ua_year_month_day$macrocall$1$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "ua_year_month_day$macrocall$1", "symbols": ["ua_year_month_day$macrocall$1$ebnf$1", "ua_year_month_day$macrocall$2", "ua_year_month_day$macrocall$1$ebnf$2"]},
    {"name": "ua_year_month_day", "symbols": ["ua_year_month_day$macrocall$1", {"literal":"-"}, "ua_month_day"], "postprocess": data => [data[0], ...data[2]]},
    {"name": "ua_month_day$macrocall$2", "symbols": ["m31"]},
    {"name": "ua_month_day$macrocall$1$ebnf$1", "symbols": ["UA"], "postprocess": id},
    {"name": "ua_month_day$macrocall$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "ua_month_day$macrocall$1$ebnf$2", "symbols": ["UA"], "postprocess": id},
    {"name": "ua_month_day$macrocall$1$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "ua_month_day$macrocall$1", "symbols": ["ua_month_day$macrocall$1$ebnf$1", "ua_month_day$macrocall$2", "ua_month_day$macrocall$1$ebnf$2"]},
    {"name": "ua_month_day$macrocall$4", "symbols": ["day"]},
    {"name": "ua_month_day$macrocall$3$ebnf$1", "symbols": ["UA"], "postprocess": id},
    {"name": "ua_month_day$macrocall$3$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "ua_month_day$macrocall$3$ebnf$2", "symbols": ["UA"], "postprocess": id},
    {"name": "ua_month_day$macrocall$3$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "ua_month_day$macrocall$3", "symbols": ["ua_month_day$macrocall$3$ebnf$1", "ua_month_day$macrocall$4", "ua_month_day$macrocall$3$ebnf$2"]},
    {"name": "ua_month_day", "symbols": ["ua_month_day$macrocall$1", {"literal":"-"}, "ua_month_day$macrocall$3"], "postprocess": pluck(0, 2)},
    {"name": "ua_month_day$macrocall$6", "symbols": ["m30"]},
    {"name": "ua_month_day$macrocall$5$ebnf$1", "symbols": ["UA"], "postprocess": id},
    {"name": "ua_month_day$macrocall$5$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "ua_month_day$macrocall$5$ebnf$2", "symbols": ["UA"], "postprocess": id},
    {"name": "ua_month_day$macrocall$5$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "ua_month_day$macrocall$5", "symbols": ["ua_month_day$macrocall$5$ebnf$1", "ua_month_day$macrocall$6", "ua_month_day$macrocall$5$ebnf$2"]},
    {"name": "ua_month_day$macrocall$8", "symbols": ["d01_30"]},
    {"name": "ua_month_day$macrocall$7$ebnf$1", "symbols": ["UA"], "postprocess": id},
    {"name": "ua_month_day$macrocall$7$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "ua_month_day$macrocall$7$ebnf$2", "symbols": ["UA"], "postprocess": id},
    {"name": "ua_month_day$macrocall$7$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "ua_month_day$macrocall$7", "symbols": ["ua_month_day$macrocall$7$ebnf$1", "ua_month_day$macrocall$8", "ua_month_day$macrocall$7$ebnf$2"]},
    {"name": "ua_month_day", "symbols": ["ua_month_day$macrocall$5", {"literal":"-"}, "ua_month_day$macrocall$7"], "postprocess": pluck(0, 2)},
    {"name": "ua_month_day$macrocall$10$string$1", "symbols": [{"literal":"0"}, {"literal":"2"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "ua_month_day$macrocall$10", "symbols": ["ua_month_day$macrocall$10$string$1"]},
    {"name": "ua_month_day$macrocall$9$ebnf$1", "symbols": ["UA"], "postprocess": id},
    {"name": "ua_month_day$macrocall$9$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "ua_month_day$macrocall$9$ebnf$2", "symbols": ["UA"], "postprocess": id},
    {"name": "ua_month_day$macrocall$9$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "ua_month_day$macrocall$9", "symbols": ["ua_month_day$macrocall$9$ebnf$1", "ua_month_day$macrocall$10", "ua_month_day$macrocall$9$ebnf$2"]},
    {"name": "ua_month_day$macrocall$12", "symbols": ["d01_29"]},
    {"name": "ua_month_day$macrocall$11$ebnf$1", "symbols": ["UA"], "postprocess": id},
    {"name": "ua_month_day$macrocall$11$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "ua_month_day$macrocall$11$ebnf$2", "symbols": ["UA"], "postprocess": id},
    {"name": "ua_month_day$macrocall$11$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "ua_month_day$macrocall$11", "symbols": ["ua_month_day$macrocall$11$ebnf$1", "ua_month_day$macrocall$12", "ua_month_day$macrocall$11$ebnf$2"]},
    {"name": "ua_month_day", "symbols": ["ua_month_day$macrocall$9", {"literal":"-"}, "ua_month_day$macrocall$11"], "postprocess": pluck(0, 2)},
    {"name": "L2X", "symbols": ["dx4"], "postprocess": masked()},
    {"name": "L2X", "symbols": ["dx4", {"literal":"-"}, "mx"], "postprocess": masked()},
    {"name": "L2X", "symbols": ["dx4", {"literal":"-"}, "mdx"], "postprocess": masked()},
    {"name": "mdx", "symbols": ["m31x", {"literal":"-"}, "d31x"], "postprocess": join},
    {"name": "mdx", "symbols": ["m30x", {"literal":"-"}, "d30x"], "postprocess": join},
    {"name": "mdx$string$1", "symbols": [{"literal":"0"}, {"literal":"2"}, {"literal":"-"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "mdx", "symbols": ["mdx$string$1", "d29x"], "postprocess": join},
    {"name": "L2i", "symbols": ["L2i_date", {"literal":"/"}, "L2i_date"], "postprocess": interval(2)},
    {"name": "L2i", "symbols": ["date_time", {"literal":"/"}, "L2i_date"], "postprocess": interval(2)},
    {"name": "L2i", "symbols": ["L2i_date", {"literal":"/"}, "date_time"], "postprocess": interval(2)},
    {"name": "L2i_date", "symbols": [], "postprocess": nothing},
    {"name": "L2i_date", "symbols": ["ua_date"], "postprocess": id},
    {"name": "L2i_date", "symbols": ["L2X"], "postprocess": id},
    {"name": "L2i_date", "symbols": ["INFINITY"], "postprocess": id},
    {"name": "L2Y", "symbols": ["exp_year"], "postprocess": id},
    {"name": "L2Y", "symbols": ["exp_year", "significant_digits"], "postprocess": merge(0, 1)},
    {"name": "L2Y", "symbols": ["L1Y", "significant_digits"], "postprocess": merge(0, 1, { level: 2 })},
    {"name": "L2Y", "symbols": ["year", "significant_digits"], "postprocess": data => year([data[0]], 2, data[1])},
    {"name": "significant_digits", "symbols": [{"literal":"S"}, "positive_digit"], "postprocess": data => ({ significant: num(data[1]) })},
    {"name": "exp_year", "symbols": [{"literal":"Y"}, "exp"], "postprocess": data => year([data[1]], 2)},
    {"name": "exp_year$string$1", "symbols": [{"literal":"Y"}, {"literal":"-"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "exp_year", "symbols": ["exp_year$string$1", "exp"], "postprocess": data => year([-data[1]], 2)},
    {"name": "exp", "symbols": ["digits", {"literal":"E"}, "digits"], "postprocess": data => num(data[0]) * Math.pow(10, num(data[2]))},
    {"name": "L2S", "symbols": ["year", {"literal":"-"}, "d25_41"], "postprocess": data => season(data, 2)},
    {"name": "decade", "symbols": ["positive_decade"], "postprocess": data => decade(data[0])},
    {"name": "decade$string$1", "symbols": [{"literal":"0"}, {"literal":"0"}, {"literal":"0"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "decade", "symbols": ["decade$string$1"], "postprocess": () => decade(0)},
    {"name": "decade", "symbols": [{"literal":"-"}, "positive_decade"], "postprocess": data => decade(-data[1])},
    {"name": "positive_decade", "symbols": ["positive_digit", "digit", "digit"], "postprocess": num},
    {"name": "positive_decade", "symbols": [{"literal":"0"}, "positive_digit", "digit"], "postprocess": num},
    {"name": "positive_decade$string$1", "symbols": [{"literal":"0"}, {"literal":"0"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "positive_decade", "symbols": ["positive_decade$string$1", "positive_digit"], "postprocess": num},
    {"name": "set", "symbols": ["LSB", "OL", "RSB"], "postprocess": list},
    {"name": "list", "symbols": ["LLB", "OL", "RLB"], "postprocess": list},
    {"name": "LSB", "symbols": [{"literal":"["}], "postprocess": () => ({ type: 'Set' })},
    {"name": "LSB$string$1", "symbols": [{"literal":"["}, {"literal":"."}, {"literal":"."}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "LSB", "symbols": ["LSB$string$1"], "postprocess": () => ({ type: 'Set', earlier: true })},
    {"name": "LLB", "symbols": [{"literal":"{"}], "postprocess": () => ({ type: 'List' })},
    {"name": "LLB$string$1", "symbols": [{"literal":"{"}, {"literal":"."}, {"literal":"."}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "LLB", "symbols": ["LLB$string$1"], "postprocess": () => ({ type: 'List', earlier: true })},
    {"name": "RSB", "symbols": [{"literal":"]"}], "postprocess": nothing},
    {"name": "RSB$string$1", "symbols": [{"literal":"."}, {"literal":"."}, {"literal":"]"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RSB", "symbols": ["RSB$string$1"], "postprocess": () => ({ later: true })},
    {"name": "RLB", "symbols": [{"literal":"}"}], "postprocess": nothing},
    {"name": "RLB$string$1", "symbols": [{"literal":"."}, {"literal":"."}, {"literal":"}"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RLB", "symbols": ["RLB$string$1"], "postprocess": () => ({ later: true })},
    {"name": "OL", "symbols": ["LI"], "postprocess": data => [data[0]]},
    {"name": "OL", "symbols": ["OL", "_", {"literal":","}, "_", "LI"], "postprocess": data => [...data[0], data[4]]},
    {"name": "LI", "symbols": ["date"], "postprocess": id},
    {"name": "LI", "symbols": ["ua_date"], "postprocess": id},
    {"name": "LI", "symbols": ["L2X"], "postprocess": id},
    {"name": "LI", "symbols": ["consecutives"], "postprocess": id},
    {"name": "consecutives$string$1", "symbols": [{"literal":"."}, {"literal":"."}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "consecutives", "symbols": ["year_month_day", "consecutives$string$1", "year_month_day"], "postprocess": d => [date(d[0]), date(d[2])]},
    {"name": "consecutives$string$2", "symbols": [{"literal":"."}, {"literal":"."}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "consecutives", "symbols": ["year_month", "consecutives$string$2", "year_month"], "postprocess": d => [date(d[0]), date(d[2])]},
    {"name": "consecutives$string$3", "symbols": [{"literal":"."}, {"literal":"."}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "consecutives", "symbols": ["year", "consecutives$string$3", "year"], "postprocess": d => [date([d[0]]), date([d[2]])]},
    {"name": "L3", "symbols": ["L3i"], "postprocess": id},
    {"name": "L3i", "symbols": ["L3S", {"literal":"/"}, "L3S"], "postprocess": interval(3)},
    {"name": "L3S", "symbols": ["L1S"], "postprocess": id},
    {"name": "L3S", "symbols": ["L2S"], "postprocess": id},
    {"name": "digit", "symbols": ["positive_digit"], "postprocess": id},
    {"name": "digit", "symbols": [{"literal":"0"}], "postprocess": id},
    {"name": "digits", "symbols": ["digit"], "postprocess": id},
    {"name": "digits", "symbols": ["digits", "digit"], "postprocess": join},
    {"name": "nd4", "symbols": ["d4"]},
    {"name": "nd4", "symbols": [{"literal":"-"}, "d4"], "postprocess": join},
    {"name": "nd3", "symbols": ["d3"]},
    {"name": "nd3", "symbols": [{"literal":"-"}, "d3"], "postprocess": join},
    {"name": "nd2", "symbols": ["d2"]},
    {"name": "nd2", "symbols": [{"literal":"-"}, "d2"], "postprocess": join},
    {"name": "d4", "symbols": ["d2", "d2"], "postprocess": join},
    {"name": "d3", "symbols": ["d2", "digit"], "postprocess": join},
    {"name": "d2", "symbols": ["digit", "digit"], "postprocess": join},
    {"name": "d5+", "symbols": ["positive_digit", "d3", "digits"], "postprocess": num},
    {"name": "d1x", "symbols": [/[1-9X]/], "postprocess": id},
    {"name": "dx", "symbols": ["d1x"], "postprocess": id},
    {"name": "dx", "symbols": [{"literal":"0"}], "postprocess": id},
    {"name": "dx2", "symbols": ["dx", "dx"], "postprocess": join},
    {"name": "dx4", "symbols": ["dx2", "dx2"], "postprocess": join},
    {"name": "dx4", "symbols": [{"literal":"-"}, "dx2", "dx2"], "postprocess": join},
    {"name": "md", "symbols": ["m31"], "postprocess": id},
    {"name": "md", "symbols": ["m30"], "postprocess": id},
    {"name": "md$string$1", "symbols": [{"literal":"0"}, {"literal":"2"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "md", "symbols": ["md$string$1"], "postprocess": id},
    {"name": "mx", "symbols": [{"literal":"0"}, "d1x"], "postprocess": join},
    {"name": "mx", "symbols": [/[1X]/, /[012X]/], "postprocess": join},
    {"name": "m31x", "symbols": [/[0X]/, /[13578X]/], "postprocess": join},
    {"name": "m31x", "symbols": [/[1X]/, /[02]/], "postprocess": join},
    {"name": "m31x$string$1", "symbols": [{"literal":"1"}, {"literal":"X"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "m31x", "symbols": ["m31x$string$1"], "postprocess": id},
    {"name": "m30x", "symbols": [/[0X]/, /[469]/], "postprocess": join},
    {"name": "m30x$string$1", "symbols": [{"literal":"1"}, {"literal":"1"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "m30x", "symbols": ["m30x$string$1"], "postprocess": join},
    {"name": "d29x", "symbols": [{"literal":"0"}, "d1x"], "postprocess": join},
    {"name": "d29x", "symbols": [/[1-2X]/, "dx"], "postprocess": join},
    {"name": "d30x", "symbols": ["d29x"], "postprocess": join},
    {"name": "d30x$string$1", "symbols": [{"literal":"3"}, {"literal":"0"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "d30x", "symbols": ["d30x$string$1"], "postprocess": id},
    {"name": "d31x", "symbols": ["d30x"], "postprocess": id},
    {"name": "d31x", "symbols": [{"literal":"3"}, /[1X]/], "postprocess": join},
    {"name": "positive_digit", "symbols": [/[1-9]/], "postprocess": id},
    {"name": "m31$subexpression$1$string$1", "symbols": [{"literal":"0"}, {"literal":"1"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "m31$subexpression$1", "symbols": ["m31$subexpression$1$string$1"]},
    {"name": "m31$subexpression$1$string$2", "symbols": [{"literal":"0"}, {"literal":"3"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "m31$subexpression$1", "symbols": ["m31$subexpression$1$string$2"]},
    {"name": "m31$subexpression$1$string$3", "symbols": [{"literal":"0"}, {"literal":"5"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "m31$subexpression$1", "symbols": ["m31$subexpression$1$string$3"]},
    {"name": "m31$subexpression$1$string$4", "symbols": [{"literal":"0"}, {"literal":"7"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "m31$subexpression$1", "symbols": ["m31$subexpression$1$string$4"]},
    {"name": "m31$subexpression$1$string$5", "symbols": [{"literal":"0"}, {"literal":"8"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "m31$subexpression$1", "symbols": ["m31$subexpression$1$string$5"]},
    {"name": "m31$subexpression$1$string$6", "symbols": [{"literal":"1"}, {"literal":"0"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "m31$subexpression$1", "symbols": ["m31$subexpression$1$string$6"]},
    {"name": "m31$subexpression$1$string$7", "symbols": [{"literal":"1"}, {"literal":"2"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "m31$subexpression$1", "symbols": ["m31$subexpression$1$string$7"]},
    {"name": "m31", "symbols": ["m31$subexpression$1"], "postprocess": id},
    {"name": "m30$subexpression$1$string$1", "symbols": [{"literal":"0"}, {"literal":"4"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "m30$subexpression$1", "symbols": ["m30$subexpression$1$string$1"]},
    {"name": "m30$subexpression$1$string$2", "symbols": [{"literal":"0"}, {"literal":"6"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "m30$subexpression$1", "symbols": ["m30$subexpression$1$string$2"]},
    {"name": "m30$subexpression$1$string$3", "symbols": [{"literal":"0"}, {"literal":"9"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "m30$subexpression$1", "symbols": ["m30$subexpression$1$string$3"]},
    {"name": "m30$subexpression$1$string$4", "symbols": [{"literal":"1"}, {"literal":"1"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "m30$subexpression$1", "symbols": ["m30$subexpression$1$string$4"]},
    {"name": "m30", "symbols": ["m30$subexpression$1"], "postprocess": id},
    {"name": "d01_11", "symbols": [{"literal":"0"}, "positive_digit"], "postprocess": join},
    {"name": "d01_11", "symbols": [{"literal":"1"}, /[0-1]/], "postprocess": join},
    {"name": "d01_12", "symbols": ["d01_11"], "postprocess": id},
    {"name": "d01_12$string$1", "symbols": [{"literal":"1"}, {"literal":"2"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "d01_12", "symbols": ["d01_12$string$1"], "postprocess": id},
    {"name": "d01_13", "symbols": ["d01_12"], "postprocess": id},
    {"name": "d01_13$string$1", "symbols": [{"literal":"1"}, {"literal":"3"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "d01_13", "symbols": ["d01_13$string$1"], "postprocess": id},
    {"name": "d00_14$string$1", "symbols": [{"literal":"0"}, {"literal":"0"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "d00_14", "symbols": ["d00_14$string$1"], "postprocess": id},
    {"name": "d00_14", "symbols": ["d01_13"], "postprocess": id},
    {"name": "d00_14$string$2", "symbols": [{"literal":"1"}, {"literal":"4"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "d00_14", "symbols": ["d00_14$string$2"], "postprocess": id},
    {"name": "d00_23$string$1", "symbols": [{"literal":"0"}, {"literal":"0"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "d00_23", "symbols": ["d00_23$string$1"], "postprocess": id},
    {"name": "d00_23", "symbols": ["d01_23"], "postprocess": id},
    {"name": "d01_23", "symbols": [{"literal":"0"}, "positive_digit"], "postprocess": join},
    {"name": "d01_23", "symbols": [{"literal":"1"}, "digit"], "postprocess": join},
    {"name": "d01_23", "symbols": [{"literal":"2"}, /[0-3]/], "postprocess": join},
    {"name": "d01_29", "symbols": [{"literal":"0"}, "positive_digit"], "postprocess": join},
    {"name": "d01_29", "symbols": [/[1-2]/, "digit"], "postprocess": join},
    {"name": "d01_30", "symbols": ["d01_29"], "postprocess": id},
    {"name": "d01_30$string$1", "symbols": [{"literal":"3"}, {"literal":"0"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "d01_30", "symbols": ["d01_30$string$1"], "postprocess": id},
    {"name": "d01_31", "symbols": ["d01_30"], "postprocess": id},
    {"name": "d01_31$string$1", "symbols": [{"literal":"3"}, {"literal":"1"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "d01_31", "symbols": ["d01_31$string$1"], "postprocess": id},
    {"name": "d00_59$string$1", "symbols": [{"literal":"0"}, {"literal":"0"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "d00_59", "symbols": ["d00_59$string$1"], "postprocess": id},
    {"name": "d00_59", "symbols": ["d01_59"], "postprocess": id},
    {"name": "d01_59", "symbols": ["d01_29"], "postprocess": id},
    {"name": "d01_59", "symbols": [/[345]/, "digit"], "postprocess": join},
    {"name": "d21_24", "symbols": [{"literal":"2"}, /[1-4]/], "postprocess": join},
    {"name": "d25_41", "symbols": [{"literal":"2"}, /[5-9]/], "postprocess": join},
    {"name": "d25_41", "symbols": [{"literal":"3"}, "digit"], "postprocess": join},
    {"name": "d25_41", "symbols": [{"literal":"4"}, /[01]/], "postprocess": join},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", {"literal":" "}], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"]}
]
  , ParserStart: "edtf"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();

},{"./bitmask":11,"./util":27}],18:[function(require,module,exports){
'use strict'

const { parse } = require('./parser')

class ExtDateTime {

  static get type() {
    return this.name
  }

  static parse(input) {
    return parse(input, { types: [this.type] })
  }

  static from(input) {
    return (input instanceof this) ? input : new this(input)
  }

  static UTC(...args) {
    let time = Date.UTC(...args)

    // ECMA Date constructor converts 0-99 to 1900-1999!
    if (args[0] >= 0 && args[0] < 100)
      time = adj(new Date(time))

    return time
  }

  get type() {
    return this.constructor.type
  }

  get edtf() {
    return this.toEDTF()
  }

  get isEDTF() {
    return true
  }

  toJSON() {
    return this.toEDTF()
  }

  toString() {
    return this.toEDTF()
  }

  toLocaleString(...args) {
    return this.localize(...args)
  }

  inspect() {
    return this.toEDTF()
  }

  valueOf() {
    return this.min
  }

  [Symbol.toPrimitive](hint) {
    return (hint === 'number') ? this.valueOf() : this.toEDTF()
  }


  covers(other) {
    return (this.min <= other.min) && (this.max >= other.max)
  }

  compare(other) {
    if (other.min == null || other.max == null) return null

    let [a, x, b, y] = [this.min, this.max, other.min, other.max]

    if (a !== b)
      return a < b ? -1 : 1

    if (x !== y)
      return x < y ? -1 : 1

    return 0
  }

  includes(other) {
    let covered = this.covers(other)
    if (!covered || !this[Symbol.iterator]) return covered

    for (let cur of this) {
      if (cur.edtf === other.edtf) return true
    }

    return false
  }

  *until(then) {
    yield this
    if (this.compare(then)) yield* this.between(then)
  }

  *through(then) {
    yield* this.until(then)
    if (this.compare(then)) yield then
  }

  *between(then) {
    then = this.constructor.from(then)

    let cur = this
    let dir = this.compare(then)

    if (!dir) return

    for (;;) {
      cur = cur.next(-dir)
      if (cur.compare(then) !== dir) break
      yield cur
    }
  }
}

function adj(date, by = 1900) {
  date.setUTCFullYear(date.getUTCFullYear() - by)
  return date.getTime()
}

module.exports = ExtDateTime

},{"./parser":22}],19:[function(require,module,exports){
'use strict'

const assert = require('assert')
const ExtDate = require('./date')
const ExtDateTime = require('./interface')
const Season = require('./season')

const V = new WeakMap()


class Interval extends ExtDateTime {
  constructor(...args) {
    super()

    V.set(this, [null, null])

    switch (args.length) {
    case 2:
      this.lower = args[0]
      this.upper = args[1]
      break

    case 1:
      switch (typeof args[0]) {
      case 'string':
        args[0] = Interval.parse(args[0])
        // eslint-disable-line no-fallthrough

      case 'object':
        if (Array.isArray(args[0]))
          args[0] = { values: args[0] }

        {
          let [obj] = args

          assert(obj !== null)
          if (obj.type) assert.equal('Interval', obj.type)

          assert(obj.values)
          assert(obj.values.length < 3)

          this.lower = obj.values[0]
          this.upper = obj.values[1]

          this.earlier = obj.earlier
          this.later = obj.later
        }
        break

      default:
        this.lower = args[0]
      }
      break

    case 0:
      break

    default:
      throw new RangeError(`invalid interval value: ${args}`)
    }
  }

  get lower() {
    return this.values[0]
  }

  set lower(value) {
    if (value == null)
      return this.values[0] = null

    if (value === Infinity || value === -Infinity)
      return this.values[0] = Infinity

    value = getDateOrSeasonFrom(value)

    if (value >= this.upper && this.upper != null)
      throw new RangeError(`invalid lower bound: ${value}`)

    this.values[0] = value
  }

  get upper() {
    return this.values[1]
  }

  set upper(value) {
    if (value == null)
      return this.values[1] = null

    if (value === Infinity)
      return this.values[1] = Infinity

    value = getDateOrSeasonFrom(value)

    if (this.lower !== Infinity && value <= this.lower)
      throw new RangeError(`invalid upper bound: ${value}`)

    this.values[1] =  value
  }

  get finite() {
    return (this.lower != null && this.lower !== Infinity) &&
      (this.upper != null && this.upper !== Infinity)
  }

  *[Symbol.iterator]() {
    if (!this.finite) throw Error('cannot iterate infinite interval')
    yield* this.lower.through(this.upper)
  }

  get values() {
    return V.get(this)
  }

  get min() {
    let v = this.lower
    return !v ? null : (v === Infinity) ? -Infinity : v.min
  }

  get max() {
    let v = this.upper
    return !v ? null : (v === Infinity) ? Infinity : v.max
  }

  toEDTF() {
    return this.values
      .map(v => {
        if (v === Infinity) return '..'
        if (!v) return ''
        return v.edtf
      })
      .join('/')
  }
}

function getDateOrSeasonFrom(value) {
  try {
    return ExtDate.from(value)
  } catch (de) {
    return Season.from(value)
  }
}

module.exports = Interval

},{"./date":13,"./interface":18,"./season":24,"assert":36}],20:[function(require,module,exports){
'use strict'

const assert = require('assert')
const Date = require('./date')
const ExtDateTime = require('./interface')
const { isArray } = Array

const V = new WeakMap()


class List extends ExtDateTime {
  constructor(...args) {
    super()

    V.set(this, [])

    if (args.length > 1) args = [args]

    if (args.length) {
      switch (typeof args[0]) {
      case 'string':
        args[0] = new.target.parse(args[0])
        // eslint-disable-line no-fallthrough

      case 'object':
        if (isArray(args[0]))
          args[0] = { values: args[0] }

        {
          let [obj] = args

          assert(obj !== null)
          if (obj.type) assert.equal(this.type, obj.type)

          assert(obj.values)
          this.concat(...obj.values)

          this.earlier = !!obj.earlier
          this.later = !!obj.later
        }
        break

      default:
        throw new RangeError(`invalid ${this.type} value: ${args}`)
      }
    }
  }

  get values() {
    return V.get(this)
  }

  get length() {
    return this.values.length
  }

  get empty() {
    return this.length === 0
  }

  get first() {
    let value = this.values[0]
    return isArray(value) ? value[0] : value
  }

  get last() {
    let value = this.values[this.length - 1]
    return isArray(value) ? value[0] : value
  }

  clear() {
    return (this.values.length = 0), this
  }

  concat(...args) {
    for (let value of args) this.push(value)
    return this
  }

  push(value) {
    if (isArray(value)) {
      assert.equal(2, value.length)
      return this.values.push(value.map(v => Date.from(v)))
    }

    return this.values.push(Date.from(value))
  }

  *[Symbol.iterator]() {
    for (let value of this.values) {
      if (isArray(value))
        yield* value[0].through(value[1])
      else
        yield value
    }
  }

  get min() {
    return this.earlier ? -Infinity : (this.empty ? 0 : this.first.min)
  }

  get max() {
    return this.later ? Infinity : (this.empty ? 0 : this.last.max)
  }

  content() {
    return this
      .values
      .map(v => isArray(v) ? v.map(d => d.edtf).join('..') : v.edtf)
      .join(',')
  }

  toEDTF() {
    return this.wrap(this.empty ?
      '' :
      `${this.earlier ? '..' : ''}${this.content()}${this.later ? '..' : ''}`
    )
  }

  wrap(content) {
    return `{${content}}`
  }
}

module.exports = List

},{"./date":13,"./interface":18,"assert":36}],21:[function(require,module,exports){
'use strict'

const keys = Reflect.ownKeys.bind(Reflect)
const descriptor = Object.getOwnPropertyDescriptor.bind(Object)
const define = Object.defineProperty.bind(Object)
const has = Object.prototype.hasOwnProperty

function mixin(target, ...mixins) {
  for (let source of mixins) {
    inherit(target, source)
    inherit(target.prototype, source.prototype)
  }

  return target
}

function inherit(target, source) {
  for (let key of keys(source)) {
    if (!has.call(target, key)) {
      define(target, key, descriptor(source, key))
    }
  }
}

module.exports = mixin

},{}],22:[function(require,module,exports){
'use strict'

const nearley = require('nearley')
const grammar = require('./grammar')

const defaults = {
  level: 2,
  types: []
}

function byLevel(a, b) {
  return a.level < b.level ? -1 : a.level > b.level ? 1 : 0
}

function limit(results, { level, types } = defaults) {
  if (!results.length) return results
  if (typeof level !== 'number') level = defaults.level

  return results.filter(res =>
    (level >= res.level) && (!types || types.includes(res.type)))
}

function best(results) {
  if (results.length < 2) return results[0]

  // If there are multiple results, pick the first
  // one on the lowest level!
  return results.sort(byLevel)[0]
}

module.exports = {
  defaults,

  parse(input, constraints = {}) {
    try {
      let nep = module.exports.parser()
      let res = best(limit(nep.feed(input).results, constraints))

      if (!res) throw new Error('edtf: No possible parsings (@EOS)')

      return res

    } catch (error) {
      error.message += ` for "${input}"`
      throw error
    }
  },

  parser() {
    return new nearley.Parser(grammar.ParserRules, grammar.ParserStart)
  }
}

},{"./grammar":17,"nearley":29}],23:[function(require,module,exports){
/*
 * Based on `nearley-unparse`
 * https://github.com/Hardmath123/nearley/blob/master/bin/nearley-unparse.js
 *
 * Copyright (c) 2014 Hardmath123
 */
'use strict'

const assert = require('assert')
const randexp = require('randexp')

const types = Object.keys(require('./types'))
const { ParserRules: Rules } = require('./grammar')
const { floor, random } = Math

const NAMES = [
  {
    any: 'L0', Date: 'date_time', Century: 'century', Interval: 'L0i'
  },
  {
    any: 'L1', Date: 'L1d', Year: 'L1Y', Season: 'L1S', Interval: 'L1i'
  },
  {
    any: 'L2', Date: 'L2s', Year: 'L2Y', Season: 'L2S', Interval: 'L2i',
    Decade: 'L2D', Set: 'set', List: 'list'
  }
]

module.exports = {

  *sample({ count, level, type } = {}) {
    let name = 'edtf'

    if (typeof count !== 'number')
      count = Infinity

    assert(count > 0, `invalid count ${count}`)

    if (typeof level !== 'undefined') {
      assert([0, 1, 2].includes(level), `invalid level ${level}`)

      if (typeof type !== 'undefined')
        assert(types.includes(type), `invalid type ${type}`)

      name = NAMES[level][type || 'any']

      if (!name)
        throw new Error(`impossible to generate ${type} at level ${level}`)
    }

    for (var i = 0; i < count; ++i) yield module.exports.gen(name)
  },

  gen(root = 'edtf') {
    let output = []
    let stack = [root]

    while (stack.length > 0) {
      let name = stack.pop()

      if (typeof name === 'string') {
        let rules = Rules.filter(r => r.name === name)

        if (rules.length > 0) {
          let sample = rules[
            floor(random() * rules.length)
          ]

          for (let j = sample.symbols.length - 1; j >= 0; --j)
            stack.push(sample.symbols[j])

        } else throw new Error(`No match for rule "${name}"!`)

        continue
      }

      if (name.test) {
        output.push(new randexp(name).gen())
        continue
      }

      if (name.literal) {
        output.push(name.literal)
        continue
      }
    }

    return output
      .join('')
      .replace(/ +/g, '')       // remove excessive whitespace
      .replace(/-0000/, '0000') // filter negative year zero
  }
}

},{"./grammar":17,"./types":26,"assert":36,"randexp":30}],24:[function(require,module,exports){
'use strict'

const assert = require('assert')
const ExtDateTime = require('./interface')
const { pad } = require('./date')

const V = new WeakMap()

class Season extends ExtDateTime {
  constructor(input) {
    super()

    V.set(this, [])

    switch (typeof input) {
    case 'number':
      this.year = input
      this.season = arguments[1] || 21
      break

    case 'string':
      input = Season.parse(input)
      // eslint-disable-line no-fallthrough

    case 'object':
      if (Array.isArray(input))
        input = { values: input }

      {
        assert(input !== null)
        if (input.type) assert.equal('Season', input.type)

        assert(input.values)
        assert.equal(2, input.values.length)

        this.year = input.values[0]
        this.season = input.values[1]
      }
      break

    case 'undefined':
      this.year = new Date().getUTCFullYear()
      this.season = 21
      break

    default:
      throw new RangeError('Invalid season value')
    }
  }

  get year() {
    return this.values[0]
  }

  set year(year) {
    this.values[0] = Number(year)
  }

  get season() {
    return this.values[1]
  }

  set season(season) {
    this.values[1] = validate(Number(season))
  }

  get values() {
    return V.get(this)
  }

  next(k = 1) {
    let { season, year } = this

    switch (true) {
    case (season >= 21 && season <= 36):
      [year, season] = inc(year, season, k, season - (season - 21) % 4, 4)
      break
    case (season >= 37 && season <= 39):
      [year, season] = inc(year, season, k, 37, 3)
      break
    case (season >= 40 && season <= 41):
      [year, season] = inc(year, season, k, 40, 2)
      break
    default:
      throw new RangeError(`Cannot compute next/prev for season ${season}`)
    }

    return new Season(year, season)
  }

  prev(k = 1) {
    return this.next(-k)
  }

  get min() { // eslint-disable-line complexity
    switch (this.season) {
    case 21:
    case 25:
    case 32:
    case 33:
    case 40:
    case 37:
      return ExtDateTime.UTC(this.year, 0)

    case 22:
    case 26:
    case 31:
    case 34:
      return ExtDateTime.UTC(this.year, 3)

    case 23:
    case 27:
    case 30:
    case 35:
    case 41:
      return ExtDateTime.UTC(this.year, 6)

    case 24:
    case 28:
    case 29:
    case 36:
      return ExtDateTime.UTC(this.year, 9)

    case 38:
      return ExtDateTime.UTC(this.year, 4)

    case 39:
      return ExtDateTime.UTC(this.year, 8)

    default:
      return ExtDateTime.UTC(this.year, 0)
    }
  }

  get max() { // eslint-disable-line complexity
    switch (this.season) {
    case 21:
    case 25:
    case 32:
    case 33:
      return ExtDateTime.UTC(this.year, 3) - 1

    case 22:
    case 26:
    case 31:
    case 34:
    case 40:
      return ExtDateTime.UTC(this.year, 6) - 1

    case 23:
    case 27:
    case 30:
    case 35:
      return ExtDateTime.UTC(this.year, 9) - 1

    case 24:
    case 28:
    case 29:
    case 36:
    case 41:
    case 39:
      return ExtDateTime.UTC(this.year + 1, 0) - 1

    case 37:
      return ExtDateTime.UTC(this.year, 5) - 1

    case 38:
      return ExtDateTime.UTC(this.year, 9) - 1

    default:
      return ExtDateTime.UTC(this.year + 1, 0) - 1
    }
  }

  toEDTF() {
    return `${this.year < 0 ? '-' : ''}${pad(this.year)}-${this.season}`
  }
}

function validate(season) {
  if (isNaN(season) || season < 21 || season === Infinity)
    throw new RangeError(`invalid division of year: ${season}`)
  return season
}

function inc(year, season, by, base, size) {
  const m = (season + by) - base

  return [
    year + Math.floor(m / size),
    validate(base + (m % size + size) % size)
  ]
}

module.exports = Season

},{"./date":13,"./interface":18,"assert":36}],25:[function(require,module,exports){
'use strict'

const List = require('./list')
const { parse } = require('./parser')

class Set extends List {
  static parse(input) {
    return parse(input, { types: ['Set'] })
  }

  get type() {
    return 'Set'
  }

  wrap(content) {
    return `[${content}]`
  }
}

module.exports = Set

},{"./list":20,"./parser":22}],26:[function(require,module,exports){
'use strict'

module.exports = {
  Date: require('./date'),
  Year: require('./year'),
  Decade: require('./decade'),
  Century: require('./century'),
  Season: require('./season'),
  Interval: require('./interval'),
  List: require('./list'),
  Set: require('./set')
}

},{"./century":12,"./date":13,"./decade":14,"./interval":19,"./list":20,"./season":24,"./set":25,"./year":28}],27:[function(require,module,exports){
'use strict'

const Bitmask = require('./bitmask')
const { assign } = Object

const util = {

  num(data) {
    return Number(Array.isArray(data) ? data.join('') : data)
  },

  join(data) {
    return data.join('')
  },

  zero() { return 0 },

  nothing() { return null },

  pick(...args) {
    return args.length === 1 ?
      data => data[args[0]] :
      data => util.concat(data, args)
  },

  pluck(...args) {
    return data => args.map(i => data[i])
  },

  concat(data, idx = data.keys()) {
    return Array.from(idx)
      .reduce((memo, i) => data[i] !== null ? memo.concat(data[i]) : memo, [])
  },

  merge(...args) {
    if (typeof args[args.length - 1] === 'object')
      var extra = args.pop()

    return data => assign(args.reduce((a, i) => assign(a, data[i]), {}), extra)
  },

  interval(level) {
    return data => ({
      values: [data[0], data[2]],
      type: 'Interval',
      level
    })
  },

  masked(type = 'unspecified', symbol = 'X') {
    return (data, _, reject) => {
      data = data.join('')

      let negative = data.startsWith('-')
      let mask = data.replace(/-/g, '')

      if (mask.indexOf(symbol) === -1) return reject

      let values = Bitmask.values(mask, 0)

      if (negative) values[0] = -values[0]

      return {
        values, [type]: Bitmask.compute(mask)
      }
    }
  },

  date(values, level = 0, extra = null) {
    return assign({
      type: 'Date',
      level,
      values: Bitmask.normalize(values.map(Number))
    }, extra)
  },

  year(values, level = 1, extra = null) {
    return assign({
      type: 'Year',
      level,
      values: values.map(Number)
    }, extra)
  },

  century(century, level = 0) {
    return {
      type: 'Century',
      level,
      values: [century]
    }
  },

  decade(decade, level = 2) {
    return {
      type: 'Decade',
      level,
      values: [decade]
    }
  },

  datetime(data) {
    let offset = data[3]
    if (offset == null) offset = new Date().getTimezoneOffset()

    return {
      values: Bitmask.normalize(data[0].map(Number)).concat(data[2]),
      offset,
      type: 'Date',
      level: 0
    }
  },

  season(data, level = 1) {
    return {
      type: 'Season',
      level,
      values: [Number(data[0]), Number(data[2])]
    }
  },

  list(data) {
    return assign({ values: data[1], level: 2 }, data[0], data[2])
  },

  qualify([parts], _, reject) {
    let q = {
      uncertain: new Bitmask(), approximate: new Bitmask()
    }

    let values = parts
      .map(([lhs, part, rhs], idx) => {
        for (let ua in lhs) q[ua].qualify(idx * 2)
        for (let ua in rhs) q[ua].qualify(1 + idx * 2)
        return part
      })

    return (!q.uncertain.value && !q.approximate.value) ?
      reject :
      assign(util.date(values, 2), {
        uncertain: q.uncertain.value,
        approximate: q.approximate.value
      })
  }

}

module.exports = util

},{"./bitmask":11}],28:[function(require,module,exports){
'use strict'

const assert = require('assert')
const ExtDate = require('./date')
const ExtDateTime = require('./interface')
const { pad } = ExtDate
const { abs } = Math

const V = new WeakMap()
const S = new WeakMap()

class Year extends ExtDateTime {
  constructor(input) {
    super()

    V.set(this, [])

    switch (typeof input) {
    case 'number':
      this.year = input
      break

    case 'string':
      input = Year.parse(input)
      // eslint-disable-line no-fallthrough

    case 'object':
      if (Array.isArray(input))
        input = { values: input }

      {
        assert(input !== null)
        if (input.type) assert.equal('Year', input.type)

        assert(input.values)
        assert(input.values.length)

        this.year = input.values[0]
        this.significant = input.significant
      }
      break

    case 'undefined':
      this.year = new Date().getUTCFullYear()
      break

    default:
      throw new RangeError('Invalid year value')
    }
  }

  get year() {
    return this.values[0]
  }

  set year(year) {
    this.values[0] = Number(year)
  }

  get significant() {
    return S.get(this)
  }

  set significant(digits) {
    S.set(this, Number(digits))
  }

  get values() {
    return V.get(this)
  }

  get min() {
    return ExtDateTime.UTC(this.year, 0)
  }

  get max() {
    return ExtDateTime.UTC(this.year + 1, 0) - 1
  }

  toEDTF() {
    let y = abs(this.year)
    let s = this.significant ? `S${this.significant}` : ''

    if (y <= 9999) return `${this.year < 0 ? '-' : ''}${pad(this.year)}${s}`

    // TODO exponential form for ending zeroes

    return `Y${this.year}${s}`
  }
}

module.exports = Year

},{"./date":13,"./interface":18,"assert":36}],29:[function(require,module,exports){
(function(root, factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.nearley = factory();
    }
}(this, function() {

    function Rule(name, symbols, postprocess) {
        this.id = ++Rule.highestId;
        this.name = name;
        this.symbols = symbols;        // a list of literal | regex class | nonterminal
        this.postprocess = postprocess;
        return this;
    }
    Rule.highestId = 0;

    Rule.prototype.toString = function(withCursorAt) {
        var symbolSequence = (typeof withCursorAt === "undefined")
                             ? this.symbols.map(getSymbolShortDisplay).join(' ')
                             : (   this.symbols.slice(0, withCursorAt).map(getSymbolShortDisplay).join(' ')
                                 + " ● "
                                 + this.symbols.slice(withCursorAt).map(getSymbolShortDisplay).join(' ')     );
        return this.name + " → " + symbolSequence;
    }


    // a State is a rule at a position from a given starting point in the input stream (reference)
    function State(rule, dot, reference, wantedBy) {
        this.rule = rule;
        this.dot = dot;
        this.reference = reference;
        this.data = [];
        this.wantedBy = wantedBy;
        this.isComplete = this.dot === rule.symbols.length;
    }

    State.prototype.toString = function() {
        return "{" + this.rule.toString(this.dot) + "}, from: " + (this.reference || 0);
    };

    State.prototype.nextState = function(child) {
        var state = new State(this.rule, this.dot + 1, this.reference, this.wantedBy);
        state.left = this;
        state.right = child;
        if (state.isComplete) {
            state.data = state.build();
            // Having right set here will prevent the right state and its children
            // form being garbage collected
            state.right = undefined;
        }
        return state;
    };

    State.prototype.build = function() {
        var children = [];
        var node = this;
        do {
            children.push(node.right.data);
            node = node.left;
        } while (node.left);
        children.reverse();
        return children;
    };

    State.prototype.finish = function() {
        if (this.rule.postprocess) {
            this.data = this.rule.postprocess(this.data, this.reference, Parser.fail);
        }
    };


    function Column(grammar, index) {
        this.grammar = grammar;
        this.index = index;
        this.states = [];
        this.wants = {}; // states indexed by the non-terminal they expect
        this.scannable = []; // list of states that expect a token
        this.completed = {}; // states that are nullable
    }


    Column.prototype.process = function(nextColumn) {
        var states = this.states;
        var wants = this.wants;
        var completed = this.completed;

        for (var w = 0; w < states.length; w++) { // nb. we push() during iteration
            var state = states[w];

            if (state.isComplete) {
                state.finish();
                if (state.data !== Parser.fail) {
                    // complete
                    var wantedBy = state.wantedBy;
                    for (var i = wantedBy.length; i--; ) { // this line is hot
                        var left = wantedBy[i];
                        this.complete(left, state);
                    }

                    // special-case nullables
                    if (state.reference === this.index) {
                        // make sure future predictors of this rule get completed.
                        var exp = state.rule.name;
                        (this.completed[exp] = this.completed[exp] || []).push(state);
                    }
                }

            } else {
                // queue scannable states
                var exp = state.rule.symbols[state.dot];
                if (typeof exp !== 'string') {
                    this.scannable.push(state);
                    continue;
                }

                // predict
                if (wants[exp]) {
                    wants[exp].push(state);

                    if (completed.hasOwnProperty(exp)) {
                        var nulls = completed[exp];
                        for (var i = 0; i < nulls.length; i++) {
                            var right = nulls[i];
                            this.complete(state, right);
                        }
                    }
                } else {
                    wants[exp] = [state];
                    this.predict(exp);
                }
            }
        }
    }

    Column.prototype.predict = function(exp) {
        var rules = this.grammar.byName[exp] || [];

        for (var i = 0; i < rules.length; i++) {
            var r = rules[i];
            var wantedBy = this.wants[exp];
            var s = new State(r, 0, this.index, wantedBy);
            this.states.push(s);
        }
    }

    Column.prototype.complete = function(left, right) {
        var copy = left.nextState(right);
        this.states.push(copy);
    }


    function Grammar(rules, start) {
        this.rules = rules;
        this.start = start || this.rules[0].name;
        var byName = this.byName = {};
        this.rules.forEach(function(rule) {
            if (!byName.hasOwnProperty(rule.name)) {
                byName[rule.name] = [];
            }
            byName[rule.name].push(rule);
        });
    }

    // So we can allow passing (rules, start) directly to Parser for backwards compatibility
    Grammar.fromCompiled = function(rules, start) {
        var lexer = rules.Lexer;
        if (rules.ParserStart) {
          start = rules.ParserStart;
          rules = rules.ParserRules;
        }
        var rules = rules.map(function (r) { return (new Rule(r.name, r.symbols, r.postprocess)); });
        var g = new Grammar(rules, start);
        g.lexer = lexer; // nb. storing lexer on Grammar is iffy, but unavoidable
        return g;
    }


    function StreamLexer() {
      this.reset("");
    }

    StreamLexer.prototype.reset = function(data, state) {
        this.buffer = data;
        this.index = 0;
        this.line = state ? state.line : 1;
        this.lastLineBreak = state ? -state.col : 0;
    }

    StreamLexer.prototype.next = function() {
        if (this.index < this.buffer.length) {
            var ch = this.buffer[this.index++];
            if (ch === '\n') {
              this.line += 1;
              this.lastLineBreak = this.index;
            }
            return {value: ch};
        }
    }

    StreamLexer.prototype.save = function() {
      return {
        line: this.line,
        col: this.index - this.lastLineBreak,
      }
    }

    StreamLexer.prototype.formatError = function(token, message) {
        // nb. this gets called after consuming the offending token,
        // so the culprit is index-1
        var buffer = this.buffer;
        if (typeof buffer === 'string') {
            var lines = buffer
                .split("\n")
                .slice(
                    Math.max(0, this.line - 5), 
                    this.line
                );

            var nextLineBreak = buffer.indexOf('\n', this.index);
            if (nextLineBreak === -1) nextLineBreak = buffer.length;
            var col = this.index - this.lastLineBreak;
            var lastLineDigits = String(this.line).length;
            message += " at line " + this.line + " col " + col + ":\n\n";
            message += lines
                .map(function(line, i) {
                    return pad(this.line - lines.length + i + 1, lastLineDigits) + " " + line;
                }, this)
                .join("\n");
            message += "\n" + pad("", lastLineDigits + col) + "^\n";
            return message;
        } else {
            return message + " at index " + (this.index - 1);
        }

        function pad(n, length) {
            var s = String(n);
            return Array(length - s.length + 1).join(" ") + s;
        }
    }

    function Parser(rules, start, options) {
        if (rules instanceof Grammar) {
            var grammar = rules;
            var options = start;
        } else {
            var grammar = Grammar.fromCompiled(rules, start);
        }
        this.grammar = grammar;

        // Read options
        this.options = {
            keepHistory: false,
            lexer: grammar.lexer || new StreamLexer,
        };
        for (var key in (options || {})) {
            this.options[key] = options[key];
        }

        // Setup lexer
        this.lexer = this.options.lexer;
        this.lexerState = undefined;

        // Setup a table
        var column = new Column(grammar, 0);
        var table = this.table = [column];

        // I could be expecting anything.
        column.wants[grammar.start] = [];
        column.predict(grammar.start);
        // TODO what if start rule is nullable?
        column.process();
        this.current = 0; // token index
    }

    // create a reserved token for indicating a parse fail
    Parser.fail = {};

    Parser.prototype.feed = function(chunk) {
        var lexer = this.lexer;
        lexer.reset(chunk, this.lexerState);

        var token;
        while (true) {
            try {
                token = lexer.next();
                if (!token) {
                    break;
                }
            } catch (e) {
                // Create the next column so that the error reporter
                // can display the correctly predicted states.
                var nextColumn = new Column(this.grammar, this.current + 1);
                this.table.push(nextColumn);
                var err = new Error(this.reportLexerError(e));
                err.offset = this.current;
                err.token = e.token;
                throw err;
            }
            // We add new states to table[current+1]
            var column = this.table[this.current];

            // GC unused states
            if (!this.options.keepHistory) {
                delete this.table[this.current - 1];
            }

            var n = this.current + 1;
            var nextColumn = new Column(this.grammar, n);
            this.table.push(nextColumn);

            // Advance all tokens that expect the symbol
            var literal = token.text !== undefined ? token.text : token.value;
            var value = lexer.constructor === StreamLexer ? token.value : token;
            var scannable = column.scannable;
            for (var w = scannable.length; w--; ) {
                var state = scannable[w];
                var expect = state.rule.symbols[state.dot];
                // Try to consume the token
                // either regex or literal
                if (expect.test ? expect.test(value) :
                    expect.type ? expect.type === token.type
                                : expect.literal === literal) {
                    // Add it
                    var next = state.nextState({data: value, token: token, isToken: true, reference: n - 1});
                    nextColumn.states.push(next);
                }
            }

            // Next, for each of the rules, we either
            // (a) complete it, and try to see if the reference row expected that
            //     rule
            // (b) predict the next nonterminal it expects by adding that
            //     nonterminal's start state
            // To prevent duplication, we also keep track of rules we have already
            // added

            nextColumn.process();

            // If needed, throw an error:
            if (nextColumn.states.length === 0) {
                // No states at all! This is not good.
                var err = new Error(this.reportError(token));
                err.offset = this.current;
                err.token = token;
                throw err;
            }

            // maybe save lexer state
            if (this.options.keepHistory) {
              column.lexerState = lexer.save()
            }

            this.current++;
        }
        if (column) {
          this.lexerState = lexer.save()
        }

        // Incrementally keep track of results
        this.results = this.finish();

        // Allow chaining, for whatever it's worth
        return this;
    };

    Parser.prototype.reportLexerError = function(lexerError) {
        var tokenDisplay, lexerMessage;
        // Planning to add a token property to moo's thrown error
        // even on erroring tokens to be used in error display below
        var token = lexerError.token;
        if (token) {
            tokenDisplay = "input " + JSON.stringify(token.text[0]) + " (lexer error)";
            lexerMessage = this.lexer.formatError(token, "Syntax error");
        } else {
            tokenDisplay = "input (lexer error)";
            lexerMessage = lexerError.message;
        }
        return this.reportErrorCommon(lexerMessage, tokenDisplay);
    };

    Parser.prototype.reportError = function(token) {
        var tokenDisplay = (token.type ? token.type + " token: " : "") + JSON.stringify(token.value !== undefined ? token.value : token);
        var lexerMessage = this.lexer.formatError(token, "Syntax error");
        return this.reportErrorCommon(lexerMessage, tokenDisplay);
    };

    Parser.prototype.reportErrorCommon = function(lexerMessage, tokenDisplay) {
        var lines = [];
        lines.push(lexerMessage);
        var lastColumnIndex = this.table.length - 2;
        var lastColumn = this.table[lastColumnIndex];
        var expectantStates = lastColumn.states
            .filter(function(state) {
                var nextSymbol = state.rule.symbols[state.dot];
                return nextSymbol && typeof nextSymbol !== "string";
            });

        if (expectantStates.length === 0) {
            lines.push('Unexpected ' + tokenDisplay + '. I did not expect any more input. Here is the state of my parse table:\n');
            this.displayStateStack(lastColumn.states, lines);
        } else {
            lines.push('Unexpected ' + tokenDisplay + '. Instead, I was expecting to see one of the following:\n');
            // Display a "state stack" for each expectant state
            // - which shows you how this state came to be, step by step.
            // If there is more than one derivation, we only display the first one.
            var stateStacks = expectantStates
                .map(function(state) {
                    return this.buildFirstStateStack(state, []) || [state];
                }, this);
            // Display each state that is expecting a terminal symbol next.
            stateStacks.forEach(function(stateStack) {
                var state = stateStack[0];
                var nextSymbol = state.rule.symbols[state.dot];
                var symbolDisplay = this.getSymbolDisplay(nextSymbol);
                lines.push('A ' + symbolDisplay + ' based on:');
                this.displayStateStack(stateStack, lines);
            }, this);
        }
        lines.push("");
        return lines.join("\n");
    }
    
    Parser.prototype.displayStateStack = function(stateStack, lines) {
        var lastDisplay;
        var sameDisplayCount = 0;
        for (var j = 0; j < stateStack.length; j++) {
            var state = stateStack[j];
            var display = state.rule.toString(state.dot);
            if (display === lastDisplay) {
                sameDisplayCount++;
            } else {
                if (sameDisplayCount > 0) {
                    lines.push('    ^ ' + sameDisplayCount + ' more lines identical to this');
                }
                sameDisplayCount = 0;
                lines.push('    ' + display);
            }
            lastDisplay = display;
        }
    };

    Parser.prototype.getSymbolDisplay = function(symbol) {
        return getSymbolLongDisplay(symbol);
    };

    /*
    Builds a the first state stack. You can think of a state stack as the call stack
    of the recursive-descent parser which the Nearley parse algorithm simulates.
    A state stack is represented as an array of state objects. Within a
    state stack, the first item of the array will be the starting
    state, with each successive item in the array going further back into history.

    This function needs to be given a starting state and an empty array representing
    the visited states, and it returns an single state stack.

    */
    Parser.prototype.buildFirstStateStack = function(state, visited) {
        if (visited.indexOf(state) !== -1) {
            // Found cycle, return null
            // to eliminate this path from the results, because
            // we don't know how to display it meaningfully
            return null;
        }
        if (state.wantedBy.length === 0) {
            return [state];
        }
        var prevState = state.wantedBy[0];
        var childVisited = [state].concat(visited);
        var childResult = this.buildFirstStateStack(prevState, childVisited);
        if (childResult === null) {
            return null;
        }
        return [state].concat(childResult);
    };

    Parser.prototype.save = function() {
        var column = this.table[this.current];
        column.lexerState = this.lexerState;
        return column;
    };

    Parser.prototype.restore = function(column) {
        var index = column.index;
        this.current = index;
        this.table[index] = column;
        this.table.splice(index + 1);
        this.lexerState = column.lexerState;

        // Incrementally keep track of results
        this.results = this.finish();
    };

    // nb. deprecated: use save/restore instead!
    Parser.prototype.rewind = function(index) {
        if (!this.options.keepHistory) {
            throw new Error('set option `keepHistory` to enable rewinding')
        }
        // nb. recall column (table) indicies fall between token indicies.
        //        col 0   --   token 0   --   col 1
        this.restore(this.table[index]);
    };

    Parser.prototype.finish = function() {
        // Return the possible parsings
        var considerations = [];
        var start = this.grammar.start;
        var column = this.table[this.table.length - 1]
        column.states.forEach(function (t) {
            if (t.rule.name === start
                    && t.dot === t.rule.symbols.length
                    && t.reference === 0
                    && t.data !== Parser.fail) {
                considerations.push(t);
            }
        });
        return considerations.map(function(c) {return c.data; });
    };

    function getSymbolLongDisplay(symbol) {
        var type = typeof symbol;
        if (type === "string") {
            return symbol;
        } else if (type === "object") {
            if (symbol.literal) {
                return JSON.stringify(symbol.literal);
            } else if (symbol instanceof RegExp) {
                return 'character matching ' + symbol;
            } else if (symbol.type) {
                return symbol.type + ' token';
            } else if (symbol.test) {
                return 'token matching ' + String(symbol.test);
            } else {
                throw new Error('Unknown symbol type: ' + symbol);
            }
        }
    }

    function getSymbolShortDisplay(symbol) {
        var type = typeof symbol;
        if (type === "string") {
            return symbol;
        } else if (type === "object") {
            if (symbol.literal) {
                return JSON.stringify(symbol.literal);
            } else if (symbol instanceof RegExp) {
                return symbol.toString();
            } else if (symbol.type) {
                return '%' + symbol.type;
            } else if (symbol.test) {
                return '<' + String(symbol.test) + '>';
            } else {
                throw new Error('Unknown symbol type: ' + symbol);
            }
        }
    }

    return {
        Parser: Parser,
        Grammar: Grammar,
        Rule: Rule,
    };

}));

},{}],30:[function(require,module,exports){
const ret    = require('ret');
const DRange = require('drange');
const types  = ret.types;


module.exports = class RandExp {
  /**
   * @constructor
   * @param {RegExp|String} regexp
   * @param {String} m
   */
  constructor(regexp, m) {
    this._setDefaults(regexp);
    if (regexp instanceof RegExp) {
      this.ignoreCase = regexp.ignoreCase;
      this.multiline = regexp.multiline;
      regexp = regexp.source;

    } else if (typeof regexp === 'string') {
      this.ignoreCase = m && m.indexOf('i') !== -1;
      this.multiline = m && m.indexOf('m') !== -1;
    } else {
      throw new Error('Expected a regexp or string');
    }

    this.tokens = ret(regexp);
  }


  /**
   * Checks if some custom properties have been set for this regexp.
   *
   * @param {RandExp} randexp
   * @param {RegExp} regexp
   */
  _setDefaults(regexp) {
    // When a repetitional token has its max set to Infinite,
    // randexp won't actually generate a random amount between min and Infinite
    // instead it will see Infinite as min + 100.
    this.max = regexp.max != null ? regexp.max :
      RandExp.prototype.max != null ? RandExp.prototype.max : 100;

    // This allows expanding to include additional characters
    // for instance: RandExp.defaultRange.add(0, 65535);
    this.defaultRange = regexp.defaultRange ?
      regexp.defaultRange : this.defaultRange.clone();

    if (regexp.randInt) {
      this.randInt = regexp.randInt;
    }
  }


  /**
   * Generates the random string.
   *
   * @return {String}
   */
  gen() {
    return this._gen(this.tokens, []);
  }


  /**
   * Generate random string modeled after given tokens.
   *
   * @param {Object} token
   * @param {Array.<String>} groups
   * @return {String}
   */
  _gen(token, groups) {
    var stack, str, n, i, l;

    switch (token.type) {
      case types.ROOT:
      case types.GROUP:
        // Ignore lookaheads for now.
        if (token.followedBy || token.notFollowedBy) { return ''; }

        // Insert placeholder until group string is generated.
        if (token.remember && token.groupNumber === undefined) {
          token.groupNumber = groups.push(null) - 1;
        }

        stack = token.options ?
          this._randSelect(token.options) : token.stack;

        str = '';
        for (i = 0, l = stack.length; i < l; i++) {
          str += this._gen(stack[i], groups);
        }

        if (token.remember) {
          groups[token.groupNumber] = str;
        }
        return str;

      case types.POSITION:
        // Do nothing for now.
        return '';

      case types.SET:
        var expandedSet = this._expand(token);
        if (!expandedSet.length) { return ''; }
        return String.fromCharCode(this._randSelect(expandedSet));

      case types.REPETITION:
        // Randomly generate number between min and max.
        n = this.randInt(token.min,
          token.max === Infinity ? token.min + this.max : token.max);

        str = '';
        for (i = 0; i < n; i++) {
          str += this._gen(token.value, groups);
        }

        return str;

      case types.REFERENCE:
        return groups[token.value - 1] || '';

      case types.CHAR:
        var code = this.ignoreCase && this._randBool() ?
          this._toOtherCase(token.value) : token.value;
        return String.fromCharCode(code);
    }
  }


  /**
   * If code is alphabetic, converts to other case.
   * If not alphabetic, returns back code.
   *
   * @param {Number} code
   * @return {Number}
   */
  _toOtherCase(code) {
    return code + (97 <= code && code <= 122 ? -32 :
      65 <= code && code <= 90  ?  32 : 0);
  }


  /**
   * Randomly returns a true or false value.
   *
   * @return {Boolean}
   */
  _randBool() {
    return !this.randInt(0, 1);
  }


  /**
   * Randomly selects and returns a value from the array.
   *
   * @param {Array.<Object>} arr
   * @return {Object}
   */
  _randSelect(arr) {
    if (arr instanceof DRange) {
      return arr.index(this.randInt(0, arr.length - 1));
    }
    return arr[this.randInt(0, arr.length - 1)];
  }


  /**
   * expands a token to a DiscontinuousRange of characters which has a
   * length and an index function (for random selecting)
   *
   * @param {Object} token
   * @return {DiscontinuousRange}
   */
  _expand(token) {
    if (token.type === ret.types.CHAR) {
      return new DRange(token.value);
    } else if (token.type === ret.types.RANGE) {
      return new DRange(token.from, token.to);
    } else {
      let drange = new DRange();
      for (let i = 0; i < token.set.length; i++) {
        let subrange = this._expand(token.set[i]);
        drange.add(subrange);
        if (this.ignoreCase) {
          for (let j = 0; j < subrange.length; j++) {
            let code = subrange.index(j);
            let otherCaseCode = this._toOtherCase(code);
            if (code !== otherCaseCode) {
              drange.add(otherCaseCode);
            }
          }
        }
      }
      if (token.not) {
        return this.defaultRange.clone().subtract(drange);
      } else {
        return this.defaultRange.clone().intersect(drange);
      }
    }
  }


  /**
   * Randomly generates and returns a number between a and b (inclusive).
   *
   * @param {Number} a
   * @param {Number} b
   * @return {Number}
   */
  randInt(a, b) {
    return a + Math.floor(Math.random() * (1 + b - a));
  }


  /**
   * Default range of characters to generate from.
   */
  get defaultRange() {
    return this._range = this._range || new DRange(32, 126);
  }

  set defaultRange(range) {
    this._range = range;
  }


  /**
   *
   * Enables use of randexp with a shorter call.
   *
   * @param {RegExp|String| regexp}
   * @param {String} m
   * @return {String}
   */
  static randexp(regexp, m) {
    var randexp;
    if(typeof regexp === 'string') {
      regexp = new RegExp(regexp, m);
    }

    if (regexp._randexp === undefined) {
      randexp = new RandExp(regexp, m);
      regexp._randexp = randexp;
    } else {
      randexp = regexp._randexp;
      randexp._setDefaults(regexp);
    }
    return randexp.gen();
  }


  /**
   * Enables sugary /regexp/.gen syntax.
   */
  static sugar() {
    /* eshint freeze:false */
    RegExp.prototype.gen = function() {
      return RandExp.randexp(this);
    };
  }
};

},{"drange":2,"ret":31}],31:[function(require,module,exports){
const util      = require('./util');
const types     = require('./types');
const sets      = require('./sets');
const positions = require('./positions');


module.exports = (regexpStr) => {
  var i = 0, l, c,
    start = { type: types.ROOT, stack: []},

    // Keep track of last clause/group and stack.
    lastGroup = start,
    last = start.stack,
    groupStack = [];


  var repeatErr = (i) => {
    util.error(regexpStr, `Nothing to repeat at column ${i - 1}`);
  };

  // Decode a few escaped characters.
  var str = util.strToChars(regexpStr);
  l = str.length;

  // Iterate through each character in string.
  while (i < l) {
    c = str[i++];

    switch (c) {
      // Handle escaped characters, inclues a few sets.
      case '\\':
        c = str[i++];

        switch (c) {
          case 'b':
            last.push(positions.wordBoundary());
            break;

          case 'B':
            last.push(positions.nonWordBoundary());
            break;

          case 'w':
            last.push(sets.words());
            break;

          case 'W':
            last.push(sets.notWords());
            break;

          case 'd':
            last.push(sets.ints());
            break;

          case 'D':
            last.push(sets.notInts());
            break;

          case 's':
            last.push(sets.whitespace());
            break;

          case 'S':
            last.push(sets.notWhitespace());
            break;

          default:
            // Check if c is integer.
            // In which case it's a reference.
            if (/\d/.test(c)) {
              last.push({ type: types.REFERENCE, value: parseInt(c, 10) });

            // Escaped character.
            } else {
              last.push({ type: types.CHAR, value: c.charCodeAt(0) });
            }
        }

        break;


      // Positionals.
      case '^':
        last.push(positions.begin());
        break;

      case '$':
        last.push(positions.end());
        break;


      // Handle custom sets.
      case '[':
        // Check if this class is 'anti' i.e. [^abc].
        var not;
        if (str[i] === '^') {
          not = true;
          i++;
        } else {
          not = false;
        }

        // Get all the characters in class.
        var classTokens = util.tokenizeClass(str.slice(i), regexpStr);

        // Increase index by length of class.
        i += classTokens[1];
        last.push({
          type: types.SET,
          set: classTokens[0],
          not,
        });

        break;


      // Class of any character except \n.
      case '.':
        last.push(sets.anyChar());
        break;


      // Push group onto stack.
      case '(':
        // Create group.
        var group = {
          type: types.GROUP,
          stack: [],
          remember: true,
        };

        c = str[i];

        // If if this is a special kind of group.
        if (c === '?') {
          c = str[i + 1];
          i += 2;

          // Match if followed by.
          if (c === '=') {
            group.followedBy = true;

          // Match if not followed by.
          } else if (c === '!') {
            group.notFollowedBy = true;

          } else if (c !== ':') {
            util.error(regexpStr,
              `Invalid group, character '${c}'` +
              ` after '?' at column ${i - 1}`);
          }

          group.remember = false;
        }

        // Insert subgroup into current group stack.
        last.push(group);

        // Remember the current group for when the group closes.
        groupStack.push(lastGroup);

        // Make this new group the current group.
        lastGroup = group;
        last = group.stack;
        break;


      // Pop group out of stack.
      case ')':
        if (groupStack.length === 0) {
          util.error(regexpStr, `Unmatched ) at column ${i - 1}`);
        }
        lastGroup = groupStack.pop();

        // Check if this group has a PIPE.
        // To get back the correct last stack.
        last = lastGroup.options ?
          lastGroup.options[lastGroup.options.length - 1] : lastGroup.stack;
        break;


      // Use pipe character to give more choices.
      case '|':
        // Create array where options are if this is the first PIPE
        // in this clause.
        if (!lastGroup.options) {
          lastGroup.options = [lastGroup.stack];
          delete lastGroup.stack;
        }

        // Create a new stack and add to options for rest of clause.
        var stack = [];
        lastGroup.options.push(stack);
        last = stack;
        break;


      // Repetition.
      // For every repetition, remove last element from last stack
      // then insert back a RANGE object.
      // This design is chosen because there could be more than
      // one repetition symbols in a regex i.e. `a?+{2,3}`.
      case '{':
        var rs = /^(\d+)(,(\d+)?)?\}/.exec(str.slice(i)), min, max;
        if (rs !== null) {
          if (last.length === 0) {
            repeatErr(i);
          }
          min = parseInt(rs[1], 10);
          max = rs[2] ? rs[3] ? parseInt(rs[3], 10) : Infinity : min;
          i += rs[0].length;

          last.push({
            type: types.REPETITION,
            min,
            max,
            value: last.pop(),
          });
        } else {
          last.push({
            type: types.CHAR,
            value: 123,
          });
        }
        break;

      case '?':
        if (last.length === 0) {
          repeatErr(i);
        }
        last.push({
          type: types.REPETITION,
          min: 0,
          max: 1,
          value: last.pop(),
        });
        break;

      case '+':
        if (last.length === 0) {
          repeatErr(i);
        }
        last.push({
          type: types.REPETITION,
          min: 1,
          max: Infinity,
          value: last.pop(),
        });
        break;

      case '*':
        if (last.length === 0) {
          repeatErr(i);
        }
        last.push({
          type: types.REPETITION,
          min: 0,
          max: Infinity,
          value: last.pop(),
        });
        break;


      // Default is a character that is not `\[](){}?+*^$`.
      default:
        last.push({
          type: types.CHAR,
          value: c.charCodeAt(0),
        });
    }

  }

  // Check if any groups have not been closed.
  if (groupStack.length !== 0) {
    util.error(regexpStr, 'Unterminated group');
  }

  return start;
};

module.exports.types = types;

},{"./positions":32,"./sets":33,"./types":34,"./util":35}],32:[function(require,module,exports){
const types = require('./types');
exports.wordBoundary = () => ({ type: types.POSITION, value: 'b' });
exports.nonWordBoundary = () => ({ type: types.POSITION, value: 'B' });
exports.begin = () => ({ type: types.POSITION, value: '^' });
exports.end = () => ({ type: types.POSITION, value: '$' });

},{"./types":34}],33:[function(require,module,exports){
const types = require('./types');

const INTS = () => [{ type: types.RANGE , from: 48, to: 57 }];

const WORDS = () => {
  return [
    { type: types.CHAR, value: 95 },
    { type: types.RANGE, from: 97, to: 122 },
    { type: types.RANGE, from: 65, to: 90 }
  ].concat(INTS());
};

const WHITESPACE = () => {
  return [
    { type: types.CHAR, value: 9 },
    { type: types.CHAR, value: 10 },
    { type: types.CHAR, value: 11 },
    { type: types.CHAR, value: 12 },
    { type: types.CHAR, value: 13 },
    { type: types.CHAR, value: 32 },
    { type: types.CHAR, value: 160 },
    { type: types.CHAR, value: 5760 },
    { type: types.RANGE, from: 8192, to: 8202 },
    { type: types.CHAR, value: 8232 },
    { type: types.CHAR, value: 8233 },
    { type: types.CHAR, value: 8239 },
    { type: types.CHAR, value: 8287 },
    { type: types.CHAR, value: 12288 },
    { type: types.CHAR, value: 65279 }
  ];
};

const NOTANYCHAR = () => {
  return [
    { type: types.CHAR, value: 10 },
    { type: types.CHAR, value: 13 },
    { type: types.CHAR, value: 8232 },
    { type: types.CHAR, value: 8233 },
  ];
};

// Predefined class objects.
exports.words = () => ({ type: types.SET, set: WORDS(), not: false });
exports.notWords = () => ({ type: types.SET, set: WORDS(), not: true });
exports.ints = () => ({ type: types.SET, set: INTS(), not: false });
exports.notInts = () => ({ type: types.SET, set: INTS(), not: true });
exports.whitespace = () => ({ type: types.SET, set: WHITESPACE(), not: false });
exports.notWhitespace = () => ({ type: types.SET, set: WHITESPACE(), not: true });
exports.anyChar = () => ({ type: types.SET, set: NOTANYCHAR(), not: true });

},{"./types":34}],34:[function(require,module,exports){
module.exports = {
  ROOT       : 0,
  GROUP      : 1,
  POSITION   : 2,
  SET        : 3,
  RANGE      : 4,
  REPETITION : 5,
  REFERENCE  : 6,
  CHAR       : 7,
};

},{}],35:[function(require,module,exports){
const types = require('./types');
const sets  = require('./sets');


const CTRL = '@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^ ?';
const SLSH = { '0': 0, 't': 9, 'n': 10, 'v': 11, 'f': 12, 'r': 13 };

/**
 * Finds character representations in str and convert all to
 * their respective characters
 *
 * @param {String} str
 * @return {String}
 */
exports.strToChars = function(str) {
  /* jshint maxlen: false */
  var chars_regex = /(\[\\b\])|(\\)?\\(?:u([A-F0-9]{4})|x([A-F0-9]{2})|(0?[0-7]{2})|c([@A-Z[\\\]^?])|([0tnvfr]))/g;
  str = str.replace(chars_regex, function(s, b, lbs, a16, b16, c8, dctrl, eslsh) {
    if (lbs) {
      return s;
    }

    var code = b ? 8 :
      a16   ? parseInt(a16, 16) :
      b16   ? parseInt(b16, 16) :
      c8    ? parseInt(c8,   8) :
      dctrl ? CTRL.indexOf(dctrl) :
      SLSH[eslsh];

    var c = String.fromCharCode(code);

    // Escape special regex characters.
    if (/[[\]{}^$.|?*+()]/.test(c)) {
      c = '\\' + c;
    }

    return c;
  });

  return str;
};


/**
 * turns class into tokens
 * reads str until it encounters a ] not preceeded by a \
 *
 * @param {String} str
 * @param {String} regexpStr
 * @return {Array.<Array.<Object>, Number>}
 */
exports.tokenizeClass = (str, regexpStr) => {
  /* jshint maxlen: false */
  var tokens = [];
  var regexp = /\\(?:(w)|(d)|(s)|(W)|(D)|(S))|((?:(?:\\)(.)|([^\]\\]))-(?:\\)?([^\]]))|(\])|(?:\\)?([^])/g;
  var rs, c;


  while ((rs = regexp.exec(str)) != null) {
    if (rs[1]) {
      tokens.push(sets.words());

    } else if (rs[2]) {
      tokens.push(sets.ints());

    } else if (rs[3]) {
      tokens.push(sets.whitespace());

    } else if (rs[4]) {
      tokens.push(sets.notWords());

    } else if (rs[5]) {
      tokens.push(sets.notInts());

    } else if (rs[6]) {
      tokens.push(sets.notWhitespace());

    } else if (rs[7]) {
      tokens.push({
        type: types.RANGE,
        from: (rs[8] || rs[9]).charCodeAt(0),
        to: rs[10].charCodeAt(0),
      });

    } else if ((c = rs[12])) {
      tokens.push({
        type: types.CHAR,
        value: c.charCodeAt(0),
      });

    } else {
      return [tokens, regexp.lastIndex];
    }
  }

  exports.error(regexpStr, 'Unterminated character class');
};


/**
 * Shortcut to throw errors.
 *
 * @param {String} regexp
 * @param {String} msg
 */
exports.error = (regexp, msg) => {
  throw new SyntaxError('Invalid regular expression: /' + regexp + '/: ' + msg);
};

},{"./sets":33,"./types":34}],36:[function(require,module,exports){
(function (global){(function (){
'use strict';

var objectAssign = require('object-assign');

// compare and isBuffer taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
// original notice:

/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
function compare(a, b) {
  if (a === b) {
    return 0;
  }

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) {
    return -1;
  }
  if (y < x) {
    return 1;
  }
  return 0;
}
function isBuffer(b) {
  if (global.Buffer && typeof global.Buffer.isBuffer === 'function') {
    return global.Buffer.isBuffer(b);
  }
  return !!(b != null && b._isBuffer);
}

// based on node assert, original notice:
// NB: The URL to the CommonJS spec is kept just for tradition.
//     node-assert has evolved a lot since then, both in API and behavior.

// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
//
// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
//
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var util = require('util/');
var hasOwn = Object.prototype.hasOwnProperty;
var pSlice = Array.prototype.slice;
var functionsHaveNames = (function () {
  return function foo() {}.name === 'foo';
}());
function pToString (obj) {
  return Object.prototype.toString.call(obj);
}
function isView(arrbuf) {
  if (isBuffer(arrbuf)) {
    return false;
  }
  if (typeof global.ArrayBuffer !== 'function') {
    return false;
  }
  if (typeof ArrayBuffer.isView === 'function') {
    return ArrayBuffer.isView(arrbuf);
  }
  if (!arrbuf) {
    return false;
  }
  if (arrbuf instanceof DataView) {
    return true;
  }
  if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
    return true;
  }
  return false;
}
// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;

// 2. The AssertionError is defined in assert.
// new assert.AssertionError({ message: message,
//                             actual: actual,
//                             expected: expected })

var regex = /\s*function\s+([^\(\s]*)\s*/;
// based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
function getName(func) {
  if (!util.isFunction(func)) {
    return;
  }
  if (functionsHaveNames) {
    return func.name;
  }
  var str = func.toString();
  var match = str.match(regex);
  return match && match[1];
}
assert.AssertionError = function AssertionError(options) {
  this.name = 'AssertionError';
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  if (options.message) {
    this.message = options.message;
    this.generatedMessage = false;
  } else {
    this.message = getMessage(this);
    this.generatedMessage = true;
  }
  var stackStartFunction = options.stackStartFunction || fail;
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, stackStartFunction);
  } else {
    // non v8 browsers so we can have a stacktrace
    var err = new Error();
    if (err.stack) {
      var out = err.stack;

      // try to strip useless frames
      var fn_name = getName(stackStartFunction);
      var idx = out.indexOf('\n' + fn_name);
      if (idx >= 0) {
        // once we have located the function frame
        // we need to strip out everything before it (and its line)
        var next_line = out.indexOf('\n', idx + 1);
        out = out.substring(next_line + 1);
      }

      this.stack = out;
    }
  }
};

// assert.AssertionError instanceof Error
util.inherits(assert.AssertionError, Error);

function truncate(s, n) {
  if (typeof s === 'string') {
    return s.length < n ? s : s.slice(0, n);
  } else {
    return s;
  }
}
function inspect(something) {
  if (functionsHaveNames || !util.isFunction(something)) {
    return util.inspect(something);
  }
  var rawname = getName(something);
  var name = rawname ? ': ' + rawname : '';
  return '[Function' +  name + ']';
}
function getMessage(self) {
  return truncate(inspect(self.actual), 128) + ' ' +
         self.operator + ' ' +
         truncate(inspect(self.expected), 128);
}

// At present only the three keys mentioned above are used and
// understood by the spec. Implementations or sub modules can pass
// other keys to the AssertionError's constructor - they will be
// ignored.

// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function fail(actual, expected, message, operator, stackStartFunction) {
  throw new assert.AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operator: operator,
    stackStartFunction: stackStartFunction
  });
}

// EXTENSION! allows for well behaved errors defined elsewhere.
assert.fail = fail;

// 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, !!guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.

function ok(value, message) {
  if (!value) fail(value, true, message, '==', assert.ok);
}
assert.ok = ok;

// 5. The equality assertion tests shallow, coercive equality with
// ==.
// assert.equal(actual, expected, message_opt);

assert.equal = function equal(actual, expected, message) {
  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
};

// 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);

assert.notEqual = function notEqual(actual, expected, message) {
  if (actual == expected) {
    fail(actual, expected, message, '!=', assert.notEqual);
  }
};

// 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);

assert.deepEqual = function deepEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
  }
};

assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'deepStrictEqual', assert.deepStrictEqual);
  }
};

function _deepEqual(actual, expected, strict, memos) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;
  } else if (isBuffer(actual) && isBuffer(expected)) {
    return compare(actual, expected) === 0;

  // 7.2. If the expected value is a Date object, the actual value is
  // equivalent if it is also a Date object that refers to the same time.
  } else if (util.isDate(actual) && util.isDate(expected)) {
    return actual.getTime() === expected.getTime();

  // 7.3 If the expected value is a RegExp object, the actual value is
  // equivalent if it is also a RegExp object with the same source and
  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
    return actual.source === expected.source &&
           actual.global === expected.global &&
           actual.multiline === expected.multiline &&
           actual.lastIndex === expected.lastIndex &&
           actual.ignoreCase === expected.ignoreCase;

  // 7.4. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if ((actual === null || typeof actual !== 'object') &&
             (expected === null || typeof expected !== 'object')) {
    return strict ? actual === expected : actual == expected;

  // If both values are instances of typed arrays, wrap their underlying
  // ArrayBuffers in a Buffer each to increase performance
  // This optimization requires the arrays to have the same type as checked by
  // Object.prototype.toString (aka pToString). Never perform binary
  // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
  // bit patterns are not identical.
  } else if (isView(actual) && isView(expected) &&
             pToString(actual) === pToString(expected) &&
             !(actual instanceof Float32Array ||
               actual instanceof Float64Array)) {
    return compare(new Uint8Array(actual.buffer),
                   new Uint8Array(expected.buffer)) === 0;

  // 7.5 For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else if (isBuffer(actual) !== isBuffer(expected)) {
    return false;
  } else {
    memos = memos || {actual: [], expected: []};

    var actualIndex = memos.actual.indexOf(actual);
    if (actualIndex !== -1) {
      if (actualIndex === memos.expected.indexOf(expected)) {
        return true;
      }
    }

    memos.actual.push(actual);
    memos.expected.push(expected);

    return objEquiv(actual, expected, strict, memos);
  }
}

function isArguments(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

function objEquiv(a, b, strict, actualVisitedObjects) {
  if (a === null || a === undefined || b === null || b === undefined)
    return false;
  // if one is a primitive, the other must be same
  if (util.isPrimitive(a) || util.isPrimitive(b))
    return a === b;
  if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
    return false;
  var aIsArgs = isArguments(a);
  var bIsArgs = isArguments(b);
  if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
    return false;
  if (aIsArgs) {
    a = pSlice.call(a);
    b = pSlice.call(b);
    return _deepEqual(a, b, strict);
  }
  var ka = objectKeys(a);
  var kb = objectKeys(b);
  var key, i;
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length !== kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] !== kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects))
      return false;
  }
  return true;
}

// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);

assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
  }
};

assert.notDeepStrictEqual = notDeepStrictEqual;
function notDeepStrictEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
  }
}


// 9. The strict equality assertion tests strict equality, as determined by ===.
// assert.strictEqual(actual, expected, message_opt);

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (actual !== expected) {
    fail(actual, expected, message, '===', assert.strictEqual);
  }
};

// 10. The strict non-equality assertion tests for strict inequality, as
// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (actual === expected) {
    fail(actual, expected, message, '!==', assert.notStrictEqual);
  }
};

function expectedException(actual, expected) {
  if (!actual || !expected) {
    return false;
  }

  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
    return expected.test(actual);
  }

  try {
    if (actual instanceof expected) {
      return true;
    }
  } catch (e) {
    // Ignore.  The instanceof check doesn't work for arrow functions.
  }

  if (Error.isPrototypeOf(expected)) {
    return false;
  }

  return expected.call({}, actual) === true;
}

function _tryBlock(block) {
  var error;
  try {
    block();
  } catch (e) {
    error = e;
  }
  return error;
}

function _throws(shouldThrow, block, expected, message) {
  var actual;

  if (typeof block !== 'function') {
    throw new TypeError('"block" argument must be a function');
  }

  if (typeof expected === 'string') {
    message = expected;
    expected = null;
  }

  actual = _tryBlock(block);

  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
            (message ? ' ' + message : '.');

  if (shouldThrow && !actual) {
    fail(actual, expected, 'Missing expected exception' + message);
  }

  var userProvidedMessage = typeof message === 'string';
  var isUnwantedException = !shouldThrow && util.isError(actual);
  var isUnexpectedException = !shouldThrow && actual && !expected;

  if ((isUnwantedException &&
      userProvidedMessage &&
      expectedException(actual, expected)) ||
      isUnexpectedException) {
    fail(actual, expected, 'Got unwanted exception' + message);
  }

  if ((shouldThrow && actual && expected &&
      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
    throw actual;
  }
}

// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);

assert.throws = function(block, /*optional*/error, /*optional*/message) {
  _throws(true, block, error, message);
};

// EXTENSION! This is annoying to write outside this module.
assert.doesNotThrow = function(block, /*optional*/error, /*optional*/message) {
  _throws(false, block, error, message);
};

assert.ifError = function(err) { if (err) throw err; };

// Expose a strict only variant of assert
function strict(value, message) {
  if (!value) fail(value, true, message, '==', strict);
}
assert.strict = objectAssign(strict, assert, {
  equal: assert.strictEqual,
  deepEqual: assert.deepStrictEqual,
  notEqual: assert.notStrictEqual,
  notDeepEqual: assert.notDeepStrictEqual
});
assert.strict.strict = assert.strict;

var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    if (hasOwn.call(obj, key)) keys.push(key);
  }
  return keys;
};

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"object-assign":40,"util/":39}],37:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],38:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],39:[function(require,module,exports){
(function (process,global){(function (){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this)}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":38,"_process":41,"inherits":37}],40:[function(require,module,exports){
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

'use strict';
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

},{}],41:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}]},{},[1]);
