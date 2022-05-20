const DURATIONS = {
    ms: 1,
    s: 1000,
    min: 1000 * 60,
    h: 1000 * 60 * 60,
    d: 1000 * 60 * 60 * 24,
    w: 1000 * 60 * 60 * 24 * 7,
    m: 1000 * 60 * 60 * 24 * 30,
    y: 1000 * 60 * 60 * 24 * 365
}

class Duration {
    readonly date_lower!: Date;
    readonly date_higher!: Date;

    readonly milliseconds!: number;
    readonly seconds!: number;
    readonly minutes!: number;
    readonly hours!: number;
    readonly days!: number;
    readonly weeks!: number;
    readonly months!: number;
    readonly years!: number;

    readonly trailing_milliseconds!: number;
    readonly trailing_seconds!: number;
    readonly trailing_minutes!: number;
    readonly trailing_hours!: number;
    readonly trailing_days!: number;
    readonly trailing_weeks!: number;
    readonly trailing_months!: number;
    readonly trailing_years!: number;

    constructor(date1: Date, date2: Date = new Date()) {
        if (date1.valueOf() > date2.valueOf()) {
            let d = date1;
            date1 = date2;
            date2 = d;
        }

        this.date_lower = date1;
        this.date_higher = date2;

        this.milliseconds = date2.valueOf() - date1.valueOf();
        this.seconds = this.milliseconds / DURATIONS.s;
        this.minutes = this.milliseconds / DURATIONS.min;
        this.hours = this.milliseconds / DURATIONS.h;
        this.days = this.milliseconds / DURATIONS.d;
        this.months = this.milliseconds / DURATIONS.m;
        this.years = this.milliseconds / DURATIONS.y;

        let ms = this.milliseconds;
        
        this.trailing_years = Math.floor(ms / DURATIONS.y);
        ms %= DURATIONS.y;

        this.trailing_months = Math.floor(ms / DURATIONS.m);
        ms %= DURATIONS.m;

        this.trailing_days = Math.floor(ms / DURATIONS.d);
        ms %= DURATIONS.d;

        this.trailing_hours = Math.floor(ms / DURATIONS.h);
        ms %= DURATIONS.h;

        this.trailing_minutes = Math.floor(ms / DURATIONS.min);
        ms %= DURATIONS.min;

        this.trailing_seconds = Math.floor(ms / DURATIONS.s);
        ms %= DURATIONS.s;

        this.trailing_milliseconds = ms;
    }
    /**
     * Returns the total duration in milliseconds.
     * 
     * Equivalent to `duration.milliseconds`
     */
    public valueOf() {
        return this.milliseconds;
    }
    /**
     * Returns a readable represantation of the duration.
     * @param ommit_empty If set to `true`, values which are equal to zero will not be added to the string.
     * @param threshold If set to more than 0, lowest units will not be added to the string.
     * @returns a string with a human-readable representation of the duration.
     */
    public toString(ommit_empty: boolean = false, threshold: number = 0): string {
        let stringArr = [];
        if (threshold < 7 && (!ommit_empty || this.trailing_years)) stringArr.push(this.trailing_years + 'y');
        if (threshold < 6 && (!ommit_empty || this.trailing_months)) stringArr.push(this.trailing_months + 'm');
        if (threshold < 5 && (!ommit_empty || this.trailing_days)) stringArr.push(this.trailing_days + 'd');
        if (threshold < 4 && (!ommit_empty || this.trailing_hours)) stringArr.push(this.trailing_hours + 'h');
        if (threshold < 3 && (!ommit_empty || this.trailing_minutes)) stringArr.push(this.trailing_minutes + 'min');
        if (threshold < 2 && (!ommit_empty || this.trailing_seconds)) stringArr.push(this.trailing_seconds + 's');
        if (threshold < 1 && (!ommit_empty || this.trailing_milliseconds)) stringArr.push(this.trailing_milliseconds + 'ms');

        return stringArr.join(' ');
    }
    /**
     * Returns the value of the highest unit with a non-zero value.
     */
    public toSimple(): [number, "ms" | "s" | "min" | "h" | "d" | "w" | "m" | "y"] {
        if (this.trailing_years) return [this.trailing_years, 'y'];
        if (this.trailing_months) return [this.trailing_months, 'm'];
        if (this.trailing_weeks) return [this.trailing_weeks, 'w'];
        if (this.trailing_days) return [this.trailing_days, 'd'];
        if (this.trailing_hours) return [this.trailing_hours, 'h'];
        if (this.trailing_minutes) return [this.trailing_minutes, 'min'];
        if (this.trailing_seconds) return [this.trailing_seconds, 's'];
        return [this.trailing_milliseconds, 'ms'];
    }
    public formattedString(format: string): string {
        let msMatch = format.match(/\{\{ms\}\}/g);
        if (msMatch?.length) format = format.replace(/\{\{ms\}\}/g, String(this.trailing_milliseconds));

        let sMatch = format.match(/\{\{s\}\}/g);
        if (sMatch?.length) format = format.replace(/\{\{s\}\}/g, String(this.trailing_seconds));

        let minMatch = format.match(/\{\{min\}\}/g);
        if (minMatch?.length) format = format.replace(/\{\{min\}\}/g, String(this.trailing_minutes));

        let hMatch = format.match(/\{\{h\}\}/g);
        if (hMatch?.length) format = format.replace(/\{\{h\}\}/g, String(this.trailing_hours));

        let dMatch = format.match(/\{\{d\}\}/g);
        if (dMatch?.length) format = format.replace(/\{\{d\}\}/g, String(this.trailing_days));

        let mMatch = format.match(/\{\{m\}\}/g);
        if (mMatch?.length) format = format.replace(/\{\{m\}\}/g, String(this.trailing_months));

        let yMatch = format.match(/\{\{y\}\}/g);
        if (yMatch?.length) format = format.replace(/\{\{y\}\}/g, String(this.trailing_years));


        let msMatch2 = format.match(/\{\{MS(?::(\d\d*))?\}\}/g);
        if (msMatch2?.length) format = format.replace(/\{\{MS(?::(\d\d*))?\}\}/g, String(this.milliseconds));
        
        let sMatch2 = format.match(/\{\{S(?::(\d\d*))?\}\}/g);
        if (sMatch2?.length) format = format.replace(/\{\{S(?::(\d\d*))?\}\}/g,  (_, p1) => String(roundTo(this.seconds, Number(p1 ?? 0))));
        
        let minMatch2 = format.match(/\{\{MIN(?::(\d\d*))?\}\}/g);
        if (minMatch2?.length) format = format.replace(/\{\{MIN(?::(\d\d*))?\}\}/g,  (_, p1) => String(roundTo(this.minutes, Number(p1 ?? 0))));
        
        let hMatch2 = format.match(/\{\{H(?::(\d\d*))?\}\}/g);
        if (hMatch2?.length) format = format.replace(/\{\{H(?::(\d\d*))?\}\}/g, (_, p1) => String(roundTo(this.hours, Number(p1 ?? 0))));
        
        let dMatch2 = format.match(/\{\{D(?::(\d\d*))?\}\}/g);
        if (dMatch2?.length) format = format.replace(/\{\{D(?::(\d\d*))?\}\}/g,  (_, p1) => String(roundTo(this.days, Number(p1 ?? 0))));
        
        let wMatch2 = format.match(/\{\{W(?::(\d\d*))?\}\}/g);
        if (wMatch2?.length) format = format.replace(/\{\{W(?::(\d\d*))?\}\}/g,  (_, p1) => String(roundTo(this.weeks, Number(p1 ?? 0))));
        
        let mMatch2 = format.match(/\{\{M(?::(\d\d*))?\}\}/g);
        if (mMatch2?.length) format = format.replace(/\{\{M(?::(\d\d*))?\}\}/g, (_, p1) => String(roundTo(this.months, Number(p1 ?? 0))));
        
        let yMatch2 = format.match(/\{\{Y(?::(\d\d*))?\}\}/g);
        if (yMatch2?.length) format = format.replace(/\{\{Y(?::(\d\d*))?\}\}/g,  (_, p1) => String(roundTo(this.years, Number(p1 ?? 0))));

        return format;
    }
    /*
    Possible overlap cases: "|" means duration boundary, "-" means overlap
    
      |--|        |    |      |     |            |     |      |   |                  |   |
     |    |        |--|          |--   |      |   --|               |   |      |   |
    */
    getOverlapDuration(duration2: Duration) {
        if (
            this.date_higher <= duration2.date_lower &&
            this.date_lower <= duration2.date_lower
            ||
            this.date_lower >= duration2.date_higher &&
            this.date_higher >= duration2.date_higher
        ) return Duration.fromNumber(0);
        if (
            this.date_lower >= duration2.date_lower &&
            this.date_higher <= duration2.date_higher
        ) return this;
        if (
            this.date_lower <= duration2.date_lower &&
            this.date_higher >= duration2.date_higher
        ) return duration2;
        if (
            this.date_higher >= duration2.date_lower &&
            this.date_higher <= duration2.date_higher
        ) return new Duration(duration2.date_lower, this.date_higher);
        if (
            this.date_lower >= duration2.date_lower &&
            this.date_lower <= duration2.date_higher
        ) return new Duration(duration2.date_higher, this.date_lower);
    }
    static fromNumber(num: number) {
        return new Duration(new Date(0), new Date(num));
    }
}
function roundTo(number: number, decimalPlaces = 1) {
    return Math.round(number * (10 ** decimalPlaces)) / (10 ** decimalPlaces);
}

export { Duration };