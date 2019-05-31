const moment = require("moment");

Number.prototype.between = function(a, b) {
    let min = Math.min.apply(Math, [a, b]),
        max = Math.max.apply(Math, [a, b]);
    return this > min && this < max;
};

let isPeakHours = inputDate => {
    let date = moment(inputDate);
    if (date.weekday() !== 6 && date.weekday() !== 0) {
        return date.hour().between(6, 9) || date.hour().between(18, 21);
    } else {
        return false;
    }
};

let isNightTime = inputDate => {
    let date = moment(inputDate);
    return !date.hour().between(22, 6);
};
/**
 * traffic will return "peakHour" || "nightTime" || "nonPeakHour" depending on the time and date
 * @param inputDate {string} a string reprenting a date that will be parsed by moment()
 * @returns {*}
 */
exports.trafficType = inputDate => {
    if (isPeakHours(inputDate)) return "peakHour";
    else if (isNightTime(inputDate)) return "nightTime";
    else return "nonPeakHour";
};
