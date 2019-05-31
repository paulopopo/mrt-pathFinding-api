// const GraphBuilder = require("../service/graph/buildGraph");

const pathFinder = require("../service/path/pathFinder");
const travelItenary = require("../service/path/index");
const { trafficType } = require("../util/helper");
const { expect } = require("chai");

describe("pathFinder", async () => {
    context("With time consideration", () => {
        it("Travel from Holland Village to Bugis", async () => {
            let startStation = "CC21";
            let endStation = "DT14";
            let startionAt = "2019-01-31T19:00";
    
    
            let result = await travelItenary(startStation, endStation, startionAt);
            // let { route, time, changeLine } = await pathFinder(
            //     GraphBuilder.mrtMap,
            //     startStation,
            //     endStation,
            //     startionAt,
            //     type
            // );
            // let result = await responseJSON(startStation, endStation, route, time, changeLine);
            expect(["CC21", "CC20", "CC19", "DT9", "DT10", "DT11", "DT12", "DT13", "DT14"]).to.eql(
                result.route
            );
        });

        it("Travel from Boon Lay to Little India during peak hours", async () => {
            let startStation = "EW27";
            let endStation = "DT12";
            let startionAt = "2019-05-24T19:00";
            let type = trafficType(startionAt);
    
            let result = await travelItenary(startStation, endStation, startionAt);
    
            // let { route, time, changeLine } = await pathFinder(
            //     GraphBuilder.mrtMap,
            //     startStation,
            //     endStation,
            //     startionAt,
            //     type
            // );
            // let result = await responseJSON(startStation, endStation, route, time, changeLine);
            expect(result.time).to.equal(150);
            expect([
                "EW27",
                "EW26",
                "EW25",
                "EW24",
                "EW23",
                "EW22",
                "EW21",
                "CC22",
                "CC21",
                "CC20",
                "CC19",
                "DT9",
                "DT10",
                "DT11",
                "DT12"
            ]).to.eql(result.route);
        });

        it("Travel from Clementi to Tuas Crescent in 1999 using travelItenary()", async () => {
            let startionAt = "1999-01-31T19:00";
            let result = await travelItenary("EW23", "EW31", startionAt);
            expect(result.description).to.equal("No path from Clementi to Tuas Crescent");
        });

        it("Travel from Clementi to Tuas Crescent in 2019 using travelItenary()", async () => {
            let startionAt = "2019-01-31T19:00";
            let result = await travelItenary("EW23", "EW31", startionAt);
            expect(result.description).to.not.equal("No path from Clementi to Tuas Crescent");
        });
    });
    ;
});
