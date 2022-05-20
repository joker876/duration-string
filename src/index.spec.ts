import { Duration } from ".";

describe("Duration testing", () => {
    it("should create", () => {
        let dur = new Duration(new Date('2021-01-01'), new Date('2022-01-01'));
        expect(dur).toBeDefined();
    });
    it("should calculate right", () => {
        let dur = new Duration(new Date('2021-01-01'), new Date('2022-01-01'));
        expect(dur.days).toBe(365);
        expect(dur.milliseconds).toBe(31536000000);
    });
    it("should calculate right #2", () => {
        let dur = Duration.fromNumber(34218061200);
        expect(dur.trailing_milliseconds).toBe(200);
        expect(dur.trailing_seconds).toBe(1);
        expect(dur.trailing_minutes).toBe(1);
        expect(dur.trailing_hours).toBe(1);
        expect(dur.trailing_days).toBe(1);
        expect(dur.trailing_months).toBe(1);
        expect(dur.trailing_years).toBe(1);
    });
    it("should return correct string", () => {
        let dur = Duration.fromNumber(34218061200);
        expect(dur.toString()).toBe('1y 1m 1d 1h 1min 1s 200ms');
    });
    it("should return correct string (ommit_empty)", () => {
        let dur = Duration.fromNumber(65428454354);
        expect(dur.toString(true)).toBe('2y 27d 6h 34min 14s 354ms');
    });
    it("should return correct string (threshold = 2)", () => {
        let dur = Duration.fromNumber(2356454354);
        expect(dur.toString(false, 2)).toBe('0y 0m 27d 6h 34min');
    });
    it("should return correct simple value", () => {
        let dur = Duration.fromNumber(34218061200);
        expect(dur.toSimple()).toEqual([1, 'y']);
    });
    it("should return correct simple value #2", () => {
        let dur = Duration.fromNumber(2356454354);
        expect(dur.toSimple()).toEqual([27, 'd']);
    });
    it("should return correct formatted string", () => {
        let dur = new Duration(new Date('2020-01-01'), new Date(1653080746183));
        expect(dur.formattedString('{{H:4}}h {{}} {{min}}min')).toBe('20901.0962h {{}} 5min');
    });
})