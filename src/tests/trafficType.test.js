const { trafficType } = require("../util/helper");
const { expect } = require("chai");

describe("Traffic Type", () => {
    context("Non-Peak ", () => {
        it("2019-05-24T15:00 is Non-Peak", () => {
            let startAt = "2019-01-31T15:00";
            let type = trafficType(startAt);
            expect(type).to.equal("nonPeakHour");
        });
        it("2019-05-24T19:00 is peakhour time", () => {
            let startAt = "2019-05-24T19:00";
            let type = trafficType(startAt);
            expect(type).not.to.equal("nonPeakHour");
        });
    });

    context("Night Time", () => {
        it("2019-05-24T23:00 is night time", () => {
            let startAt = "2019-01-31T23:00";
            let type = trafficType(startAt);
            expect(type).to.equal("nightTime");
        });
        it("2019-05-24T19:00 is NOT night time", () => {
            let startAt = "2019-01-31T19:00";
            let type = trafficType(startAt);
            expect(type).to.not.equal("nightTime");
        });
    });

    context("Peak hour", () => {
        it("2019-05-24T19:00 is peak hour time", () => {
            let startAt = "2019-05-24T19:00";
            let type = trafficType(startAt);
            expect(type).to.equal("peakHour");
        });
        it("2019-05-24T19:00 is NOT peak time", () => {
            let startAt = "2019-05-24T23:00";
            let type = trafficType(startAt);
            expect(type).to.not.equal("peakHour");
        });
        it("2019-05-25T19:00 (Weekend) NOT peak time", () => {
            let startAt = "2019-05-25T19:00";
            let type = trafficType(startAt);
            expect(type).to.not.equal("peakHour");
        });
        it("2019-05-26T19:00 (Weekend) NOT peak time", () => {
            let startAt = "2019-05-26T19:00";
            let type = trafficType(startAt);
            expect(type).to.not.equal("peakHour");
        });
    });
});
