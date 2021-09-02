"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDate = exports.isCorrectDateFormat = void 0;
function isCorrectDateFormat(string) {
    if (regexes.fullDate.test(string))
        return true;
    if (regexes.monthlyDate.test(string))
        return true;
    if (regexes.timeOnly.test(string))
        return true;
    return string.toLowerCase() == "now";
}
exports.isCorrectDateFormat = isCorrectDateFormat;
// require isCorrectDateFormat checked string
function toDate(string) {
    const now = new Date();
    const type = whatType(string);
    if (type == DateType.FULL) {
        return new Date(string);
    }
    if (type == DateType.MONTHLY) {
        return new Date(`${now.getFullYear()}-${string}`);
    }
    if (type == DateType.TIME_ONLY) {
        return new Date(`${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${string}`);
    }
    if (type == DateType.NOW)
        return now;
    throw new Error();
}
exports.toDate = toDate;
function whatType(string) {
    if (regexes.fullDate.test(string))
        return DateType.FULL;
    if (regexes.monthlyDate.test(string))
        return DateType.MONTHLY;
    if (regexes.timeOnly.test(string))
        return DateType.TIME_ONLY;
    if (string.toLowerCase() == "now")
        return DateType.NOW;
    return DateType.NOT_DATE;
}
const regexes = {
    fullDate: /\d{4}-[1-9]{1,2}-[0-9]{1,2} \d{1,2}:\d{1,2}/,
    monthlyDate: /[1-9]{1,2}-[0-9]{1,2} \d{1,2}:\d{1,2}/,
    timeOnly: /\d{1,2}:\d{1,2}/
};
var DateType;
(function (DateType) {
    DateType[DateType["NOT_DATE"] = 0] = "NOT_DATE";
    DateType[DateType["FULL"] = 1] = "FULL";
    DateType[DateType["MONTHLY"] = 2] = "MONTHLY";
    DateType[DateType["TIME_ONLY"] = 3] = "TIME_ONLY";
    DateType[DateType["NOW"] = 4] = "NOW";
})(DateType || (DateType = {}));
