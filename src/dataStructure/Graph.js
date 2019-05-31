class Graph {
    constructor() {
        this.nodes = [];
        this.adjacencyList = {};
    }

    addNode(node) {
        this.nodes.push(node);
        this.adjacencyList[node] = [];
    }

    addEdge(node1, node1code, node1OpeningDate, node2, node2code, node2OpeningDate, weight) {
        this.adjacencyList[node1].push({
            originCode: node1code,
            originOpeningDate: node1OpeningDate,
            node: node2,
            destinationOpeningDate: node2OpeningDate,
            destinationCode: node2code,
            weight: weight
        });
        this.adjacencyList[node2].push({
            originCode: node2code,
            originOpeningDate: node2OpeningDate,
            node: node1,
            destinationOpeningDate: node1OpeningDate,
            destinationCode: node1code,
            weight: weight
        });
    }

    setNodes(nodes) {
        this.nodes = nodes;
    }
    setAdjacencyList(adjacencyList) {
        this.adjacencyList = adjacencyList;
    }
}

module.exports = Graph;
