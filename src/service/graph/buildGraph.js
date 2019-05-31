const GraphBuilder = require("./GraphBuilder");

(async () => {
    let stationMapCSVPath = process.argv[2];
    let mrtMapOutPutPath = process.argv[3];
    await GraphBuilder.buildGraph(stationMapCSVPath, mrtMapOutPutPath);
})();
