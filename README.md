# Duration String
A JavaScript library for working with time durations.

## Highlights
* Supports TypeScript!
* Supports Node and browser
* Includes full JSX documentation
* Code weighs only 12kB

## Installation
### Node / TypeScript
```
npm install duration-string --save
```
### Web
```html
<script src="https://joker876.github.io/duration-string/dist/index.js"></script>
```

## Usage
Duration String exports `Duration` class. It can be imported like this:
```js
import { Duration } from 'duration-string';
```

### Constructor
Constructor requires from 1 to 2 arguments:

`new Duration(date1: Date, date2?: Date)`
- `date1` - the beginning date of the duration.
- `date2` - the ending date of the duration. Optional, defaults to `new Date()`.

If the dates are placed in the wrong order, i.e. beggining date is higher than ending date, they are swapped and saved in the correct order.

### Static methods

#### `Duration.fromNumber(ms: number)`
Requires one argument:
* `ms` - the duration in milliseconds.

It will return a new `Duration` instance, with the starting date being `new Date(0)`, and ending date being `new Date(ms)`.

### Instance methods

#### `Duration.prototype.valueOf()`
Returns the duration in milliseconds.

#### `Duration.prototype.toString(ommit_empty?: boolean, threshold?: number)`
Returns the duration, converted to a human-readable format. Example output may be: `1y 1m 1d 1h 1min 1s 1ms`

There are two possible arguments:

* `ommit_empty` - if the value near the unit is equal to 0, it is ommitted, and not added to the final string.
* `threshold` - if set to a number higher than 0, it trims that many lowest units from the value.

```js
// Examples

let duration = new Duration(new Date('2020-01-01T03:24:01'), new Date('2021-01-24T08:11:56.176');

duration.toString()         // 1y 0m 24d 3h 47min 55s 176ms
duration.toString(true)     // 1y 24d 3h 47min 55s 176ms
duration.toString(false, 3) // 1y 0m 24d 3h
```

#### `Duration.prototype.toSimple()`
Returns the highest non-zero unit, and returns it.

It returns an array containing the value of the unit and the unit as two separate elements.

#### `Duration.prototype.formattedString(format: string)`
When given a string, formats the duration according to the given pattern. Certain patterns are replaced with real values, which are the properties of that `Duration` instance. The patterns are:
* Standard patterns:
    * `{{y}}` - `Duration.prototype.trailing_years`
    * `{{m}}` - `Duration.prototype.trailing_months`
    * `{{w}}` - `Duration.prototype.trailing_weeks`
    * `{{d}}` - `Duration.prototype.trailing_days`
    * `{{h}}` - `Duration.prototype.trailing_hours`
    * `{{min}}` - `Duration.prototype.trailing_minutes`
    * `{{s}}` - `Duration.prototype.trailing_seconds`
    * `{{ms}}` - `Duration.prototype.trailing_milliseconds`
* Total patterns:
    * `{{Y}}` - `Duration.prototype.years`
    * `{{M}}` - `Duration.prototype.months`
    * `{{W}}` - `Duration.prototype.weeks`
    * `{{D}}` - `Duration.prototype.days`
    * `{{H}}` - `Duration.prototype.hours`
    * `{{MIN}}` - `Duration.prototype.minutes`
    * `{{S}}` - `Duration.prototype.seconds`
    * `{{MS}}` - `Duration.prototype.milliseconds`

Total patterns are replaced with floating-point values, rounded to integers by default. This can, however, be changed by adding a number after the name, separated with the pipe (`|`) character, such as: `{{H:4}}`. The number defines how many decimal places should the value be rounded to.

```js
//Examples
let duration = new Duration(new Date('2020-01-01T03:24:01'), new Date('2021-01-24T08:11:56.176');

duration.formattedString('{{h}}:{{min}}')        // 4:47
duration.formattedString('{{H}}h ago')           // 9341h ago
duration.formattedString('{{D:5}} days')         // 389.19994 days
```

#### `Duration.prototype.getOverlapDuration(duration: Duration)`
Returns a new instance of `Duration` in which the two durations overlap.

If there is no overlap, returns a duration of 0 ms.

* `duration` - the second duration, used to calculate the overlap. Required. Must be an instance of `Duration`.

### Instance properties
All instances of `Duration` have the properties listed in the table.

All examples below are for the following duration:
```js
let duration = new Duration(new Date('2020-01-01T03:24:01'), new Date('2021-03-24T08:11:56.176');
```

Property | Description | Example value
-------- | ----------- | -------------
`milliseconds` | The total milliseconds between the two dates. | `38724475176`
`seconds` | The total seconds between the two dates. | `38724475.176`
`minutes` | The total minutes between the two dates. | `645407.9196`
`hours` | The total hours between the two dates. | `10756.79866`
`days` | The total days between the two dates. | `448.1999441666667`
`weeks` | The total weeks between the two dates. | `64.02856345238095`
`months` | The total months between the two dates. | `14.939998138888889`
`years` | The total years between the two dates. | `1.2279450525114155`
|| 
`trailing_years` | The total full years between the two dates. | `1`
`trailing_months` | The total full months between the two dates, excluding the full years. | `2`
`trailing_weeks` | The total full weeks between the two dates, excluding the full years and months. | `3`
`trailing_days` | The total full days between the two dates, excluding the full years and months (not excluding the weeks!). | `23`
`trailing_hours` | The total full hours between the two dates, excluding the full years, months, and days. | `4`
`trailing_minutes` | The total full minutes between the two dates, excluding the full years, months, days, and hours. | `47`
`trailing_seconds` | The total full seconds between the two dates, excluding the full years, months, days, hours, and minutes. | `55`
`trailing_milliseconds` | The total full milliseconds between the two dates, excluding all the full higher units. | `176`