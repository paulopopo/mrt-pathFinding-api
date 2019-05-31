const PriorityQueue = require("../../dataStructure/PriorityQueue");
const moment = require("moment");

let pathFinder = (map, startNode, endNode, startAt, type) =>
    new Promise((resolve, rejects) => {
        let times = {};
        let backtrace = {};
        let changeLine = 0;
        let pq = new PriorityQueue();

        times[startNode] = 0;

        map.nodes.forEach(node => {
            if (node !== startNode) {
                times[node] = Infinity;
            }
        });

        pq.enqueue([startNode, 0]);

        while (!pq.isEmpty()) {
            let currentNode = pq.dequeue()[0];
            let previousLineName;
            map.adjacencyList[currentNode].forEach(neighbor => {
                //The neighbour node is close due to night time or not Opening date not reach yet
                if (startAt)
                    if (
                        neighbor.weight[type] === 0 ||
                        (startAt &&
                            moment(startAt, "YYYY-MM-DDThh:mm") <
                                moment(neighbor.destinationOpeningDate))
                    ) {
                        return;
                    }
                let time = times[currentNode] + neighbor.weight[type];
                let lineName = `${neighbor.originCode[0]}${neighbor.originCode[1]}`;
                //Adding time when changing line
                if (previousLineName && previousLineName !== lineName) {
                    time = time + minutesWhenChangingLine(type);
                }
                if (time < times[neighbor.node]) {
                    times[neighbor.node] = time;
                    backtrace[neighbor.node] = {
                        node: currentNode,
                        originCode: neighbor.originCode,
                        destinationCode: neighbor.destinationCode
                    };
                    pq.enqueue([neighbor.node, time]);
                }
                previousLineName = lineName;
            });
        }
        //if True : it means there is no connection route between startNode and endNode
        if (times[endNode] === Infinity) {
            rejects();
        }

        let route = [];
        let lastStep = { originCode: "", destinationCode: "", node: endNode };

        let previousNode = {};
        let previousNodeLineName;

        while (lastStep.node !== startNode) {
            let currentNode = backtrace[lastStep.node];
            let lineName = `${currentNode.destinationCode[0]}${currentNode.destinationCode[1]}`;
            if (previousNodeLineName && previousNodeLineName !== lineName) {
                route.unshift(previousNode.originCode);
                changeLine = changeLine + 1;
            }
            route.unshift(currentNode.destinationCode);
            lastStep = currentNode;
            previousNode = currentNode;
            previousNodeLineName = lineName;
        }

        route.unshift(lastStep.originCode);
        resolve({ route, time: times[endNode], changeLine });
    });

let minutesWhenChangingLine = lineName => {
    switch (lineName) {
        case "peakHour":
            return 15;
        case "nonPeakHour":
            return 10;
        case "nightTime":
            return 10;
        case "default":
            return 0;
        default:
            return 0;
    }
};
module.exports = pathFinder;
