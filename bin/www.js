#!/usr/bin/env node

const debug = require("debug")("ecommerce-server-client:server");
const http = require("http");
const cluster = require("cluster");
const { Server } = require("socket.io");
const { createAdapter, setupPrimary } = require("@socket.io/cluster-adapter");
const { setupWorker, setupMaster } = require("@socket.io/sticky");
const os = require("os");
const logger = require("../src/utilities/logger/loger.util");

const numCPUs = os.cpus().length;
const port = normalizePort(process.env.PORT || "3000");

if (cluster.isMaster) {
  console.log(`Master cluster setting up ${numCPUs} workers...`);
  const  app  = require("../app");
  const httpServer = http.createServer(app);

  setupMaster(httpServer, {
    loadBalancingMethod: "least-connection",
  });

  setupPrimary();

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("online", (worker) => {
    console.log(`Worker ${worker.process.pid} is online`);
  });

  cluster.on("exit", (worker, code, signal) => {
    console.log(
      `Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`
    );
    console.log("Starting a new worker");
    cluster.fork();
  });
} else {
  console.log(`Worker ${process.pid} started`);
  const app = require("../app");
  const httpServer = http.createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: true,
      credentials: true,
    },
    transports: ["websocket"],
  });

  io.adapter(createAdapter());
  setupWorker(io);
  app.set("port", port);

  io.on("connection", (socket) => {
    /* ... */
  });
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val; // named pipe
  }

  if (port >= 0) {
    return port; // port number
  }

  return false;
}
