import winston from 'winston';

const logger = winston.createLogger({
  level: 'info', // logger will log all messages with a severity of 'info' and above
  format: winston.format.json(), // all log messages will be output as JSON
  defaultMeta: { service: 'bookings-api' }, //add some default metadata to all log messages. In this case, every log message will include `{ service: 'bookstore-api' }` in its metadata.
//   transports: [
//     //
//     // - Write all logs with importance level of `error` or higher to `error.log`
//     //   (i.e., error, fatal, but not other levels)
//     //
//     new winston.transports.File({ filename: 'error.log', level: 'error' }),
//     //
//     // - Write all logs with importance level of `info` or higher to `combined.log`
//     //   (i.e., fatal, error, warn, and info, but not trace)
//     //
//     new winston.transports.File({ filename: 'combined.log' }),
//   ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') { //if not in production phase
  logger.add(new winston.transports.Console({ // logs will be output in console of the TERMINAL
    format: winston.format.simple(), // logs will be output in a simple, human-readable format rather than as JSON
  }));
}

export default logger