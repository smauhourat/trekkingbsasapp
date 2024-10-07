const winston = require('winston')
require('winston-daily-rotate-file')
const { combine, timestamp, json } = winston.format

const fileRotateTransport = new winston.transports.DailyRotateFile({
  level: "info",
  filename: 'combined-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '7d',
})

const options = {
  console: {
    level: 'debug',
    handleExceptions: true,
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
  }
}

// Setup Winston for detailed logging
// format: winston.format.json(),
const logger = winston.createLogger({
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.Console(options.console),
    fileRotateTransport
    // new winston.transports.File({ filename: 'combined.log' })
  ]
})


module.exports = logger