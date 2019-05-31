exports.onListening = address => {
    let bind = typeof address === "string" ? "pipe " + address : "port " + address.port;
    console.log("Listening on " + bind);
};

exports.onError = error => {
    if (error.syscall !== "listen") {
        throw error;
    }
    let bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
};
