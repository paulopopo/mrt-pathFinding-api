const Graph = require("../../dataStructure/Graph");
const csv = require("csv-parser");
const moment = require("moment");
const fs = require("fs");

let GRAPH_PATH = "src/graphs/mrtMaps.json";

class GraphBuilder {
    constructor() {
    
        if (!GraphBuilder.instance) {
            this.mrtMap = new Graph();
            this.allStations = new Set();
            this.mapStationNameStationCode = {};
            this.loadGraph(GRAPH_PATH).then();
            GraphBuilder.instance = this;
        }
        return GraphBuilder.instance;
    }
    /**
     *
     * @param inputFilePath {string} : mrt csv path
     * @param outputFilePath {string} : path for serialized output file
     * @returns {Promise}
     */
    buildGraph(inputFilePath, outputFilePath) {
        return new Promise((resolve, rejects) => {
            let currentBuildingLineName;
            let previousStation = { name: "", code: "", openingDate: "" };
            console.log(`Reading ${inputFilePath}...`);
            fs.createReadStream(inputFilePath)
                .pipe(csv())
                .on("data", row => {
                    let stationCode = row["Station Code"];
                    let stationName = row["Station Name"];
                    let openingDate = moment(row["Opening Date"]);
                    this.mapStationNameStationCode[stationCode] = stationName;
                    //The two first char of a stationCode represent the line
                    let lineName = `${stationCode[0]}${stationCode[1]}`;
                    //The station never has been add in the mrtMap
                    if (!this.allStations.has(stationName)) {
                        this.allStations.add(stationName);
                        this.mrtMap.addNode(stationName);
                    }
                    if (currentBuildingLineName === lineName) {
                        //Minutes represent the time between stops
                        let minutes = {
                            peakHour: this.minutesPeakHour(lineName),
                            nonPeakHour: this.minutesNonPeakHour(lineName),
                            nightTime: this.minutesNightTime(lineName),
                            default: 1
                        };
                        //minutes = 0 means that there is no connection because the line doesn't operate
                        //We are working on the same lineName, so we have to connect all the station
                        this.mrtMap.addEdge(
                            previousStation.name,
                            previousStation.code,
                            previousStation.openingDate,
                            stationName,
                            stationCode,
                            openingDate,
                            minutes
                        );
                    } else {
                        //We are switching to a new lineName
                        currentBuildingLineName = lineName;
                    }
                    previousStation.name = stationName;
                    previousStation.code = stationCode;
                    previousStation.openingDate = openingDate;
                })
                .on("end", () => {
                    let serializedMap = JSON.stringify(this.mrtMap);
                    fs.writeFile(outputFilePath, serializedMap, err => {
                        if (err) {
                            console.log(err);
                            rejects(err);
                        } else {
                            console.log(`${outputFilePath} saved!`);
                            resolve();
                        }
                    });
                });
        });
    }

    /**
     * Load the JSON format path and set values to the mrtMap
     * @param path {string} graph path
     * @returns {Promise}
     */
    loadGraph(path) {
        return new Promise((resolve, rejects) => {
            fs.readFile(path, "utf8", (err, contents) => {
                if (err) {
                    rejects(err);
                } else {
                    let object = JSON.parse(contents);
                    this.mrtMap.setNodes(object.nodes);
                    this.mrtMap.setAdjacencyList(object.adjacencyList);
                    resolve();
                }
            });
        });
    }

    minutesPeakHour(lineName) {
        switch (lineName) {
            case "NS":
                return 12;
            case "NE":
                return 12;
            default:
                return 10;
        }
    }

    minutesNonPeakHour(lineName) {
        switch (lineName) {
            case "DT":
                return 8;
            case "TE":
                return 8;
            default:
                return 10;
        }
    }

    minutesNightTime(lineName) {
        switch (lineName) {
            case "DT":
                return 0;
            case "CG":
                return 0;
            case "CE":
                return 0;
            case "TE":
                return 8;
            default:
                return 10;
        }
    }
}

const instance = new GraphBuilder();
Object.freeze(instance);

module.exports = instance;
