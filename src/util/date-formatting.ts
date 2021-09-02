export function isCorrectDateFormat(string: string) {
    if (regexes.fullDate.test(string)) return true;
    if (regexes.monthlyDate.test(string)) return true;
    if (regexes.timeOnly.test(string)) return true;
    return string.toLowerCase() == "now";
}

// require isCorrectDateFormat checked string
export function toDate(string: string): Date {
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
    if (type == DateType.NOW) return now;

    throw new Error();
}

function whatType(string: string) {
    if (regexes.fullDate.test(string)) return DateType.FULL;
    if (regexes.monthlyDate.test(string)) return DateType.MONTHLY;
    if (regexes.timeOnly.test(string)) return DateType.TIME_ONLY;
    if (string.toLowerCase() == "now") return DateType.NOW;

    return DateType.NOT_DATE;
}

const regexes = {
    fullDate: /\d{4}-[1-9]{1,2}-[0-9]{1,2} \d{1,2}:\d{1,2}/,
    monthlyDate: /[1-9]{1,2}-[0-9]{1,2} \d{1,2}:\d{1,2}/,
    timeOnly: /\d{1,2}:\d{1,2}/
};

enum DateType {
    NOT_DATE, FULL, MONTHLY, TIME_ONLY, NOW
}