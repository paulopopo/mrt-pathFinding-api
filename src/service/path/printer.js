let stationIdName = require("../graph/stationIdName.json");

let responseJSON = (startStation, endStation, route, time, changeLine, type) =>
    new Promise(resolve => {
        let result = {
            description: `Travel from ${startStation} to ${endStation}`,
            route: route,
            changeLine: changeLine,
            details: []
        };
        if (type !== "default") {
            result["time"] = time;
            result["traffic"] = type;
        }
        let firstStationCode = route[0];
        let currentLine = `${firstStationCode[0]}${firstStationCode[1]}`;
        if (route.length > 1) {
            result.details.push(
                `Take ${currentLine} line from ${stationIdName[firstStationCode]} to ${
                    stationIdName[route[1]]
                }`
            );

            for (let i = 1; i < route.length - 1; i++) {
                let stationCode = route[i];
                let line = `${stationCode[0]}${stationCode[1]}`;
                if (currentLine !== line) {
                    result.details.push(`Change originCode ${currentLine} line to ${line} line`);
                    currentLine = line;
                }
                if (stationIdName[route[i]] !== stationIdName[route[i + 1]]) {
                    result.details.push(
                        `Take ${currentLine} line from ${stationIdName[route[i]]} to ${
                            stationIdName[route[i + 1]]
                        }`
                    );
                }
            }
        }
        resolve(result);
    });

module.exports = responseJSON;
