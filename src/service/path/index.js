const GraphBuilder = require("../graph/GraphBuilder");
const pathFinder = require("./pathFinder");
const responseJSON = require("./printer");
const { trafficType } = require("../../util/helper");

let stationIdName = require("../graph/stationIdName.json");

/**
 *
 * @param start {string} mrt start code
 * @param end {string} mrt stop code
 * @param startAt {string} nullable : Date a a string
 * @param type {string} nullable : type of traffic
 * @returns {Promise.<*>}
 */
const travelItenary = async (start, end, startAt, type) => {
    if (!stationIdName[start]) {
        return { error: `${start} station code does not exist` };
    }
    if (!stationIdName[end]) {
        return { error: `${end} station code does not exist` };
    }
    let startStation = stationIdName[start];
    let endStation = stationIdName[end];
    //type is not specified so we will evaluate it
    if (!type) {
        if (startAt) {
            type = trafficType(startAt);
        } else type = "default";
    }

    let result;

    try {
        let { route, time, changeLine } = await pathFinder(
            GraphBuilder.mrtMap,
            startStation,
            endStation,
            startAt,
            type
        );
        result = await responseJSON(startStation, endStation, route, time, changeLine, type);
    } catch (e) {
        result = {
            description: `No path from ${startStation} to ${endStation}`,
            time: 0,
            route: [],
            changeLine: 0,
            details: []
        };
    }
    return result;
};
module.exports = travelItenary;
