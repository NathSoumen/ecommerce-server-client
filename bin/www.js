#!/usr/bin/env node

/**
 * Module dependencies.
 */

var debug = require('debug')('ecommerce-server-client:server');
var http = require('http');
const cluster = require('cluster')
const {Server} = require('socket.io');
const { createAdapter, setupPrimary } = require('@socket.io/cluster-adapter');
const { setupWorker, setupMaster } = require('@socket.io/sticky');
const numCPUs = require('os').cpus
/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');

/**
 * Create HTTP server.
 */

if(cluster.isMaster) {

  const httpServer = http.createServer()
setupMaster(httpServer,{
  loadBalancingMethod:'least-connection'
})
setupPrimary()

cluster.setupMaster({serialization:'advance'})

for (let i = 0; i < numCPUs; i++) {
cluster.fork()  
}
}else {  
  const  {app,setupRotes} = require('../app');
  const httpServer = http.Server(app)
  const io = new Server (httpServer,{
    cors:{
      origin:true,
      credentials:true
    },
    transports:['websocket']
  })
io.adapter(createAdapter())
setupWorker(io)
setupRotes(app,io)
app.set('port', port);
/**
 * Listen on provided port, on all network interfaces.
 */

httpServer.listen(port,(err)=>{
  if(err){
    console.error(err)
  }else {
    console.log("Server is running at port"+port);
  }
});
httpServer.on('error', onError);
httpServer.on('listening', onListening);

}



/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
