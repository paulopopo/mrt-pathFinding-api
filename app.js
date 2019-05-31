let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let http = require('http');
let pathRouter = require('./src/routes/path');
let {onError }= require("./src/util/logger");
let {onListening }= require("./src/util/logger");

const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');
/**
 * Server setup
 */
let app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/**
 * Routes
 */
app.use('/path', pathRouter);
app.use('/docs/v1/', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(function(req, res, next) {
    next(createError(404));
});

const port = 3000;


app.set('port', port);

/**
 * Run server
 */
let server = http.createServer(app);


server.listen(port);
server.on('error', onError);
server.on('listening',() => onListening(server.address()));


