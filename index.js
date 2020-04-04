const Server = require('./lib/server').Server;
const Handler = require('./lib/handler').handlers;
const responseRandomizer = require('./lib/handler').pickRandomHandler;

exports.Server = Server;
exports.Handler = Handler;
exports.responseRandomizer = responseRandomizer;