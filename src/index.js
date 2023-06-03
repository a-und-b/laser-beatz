// const { Server } = require('socket.io');
const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');

let server;

mongoose.connect(config.mongoose.url, config.mongoose.options).then((db) => {
  db.connections[0].collection('users').drop();
  logger.info('Connected to MongoDB');
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });

  // const socket = new Server(server);

  // socket.on('connection', (io) => {
  //   console.log('a user connected');
  //   io.on('disconnect', () => {
  //     console.log('user disconnected');
  //   });
  // });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});

// module.exports = server;