const { createLogger, format, transports } = require('winston')
const { combine, timestamp, label, printf } = format

const path = require('path')

let logPath = '../log/'

const myFormat = printf(info => {
  return `${info.timestamp} [${info.label}]S: ${info.message}`;
})

const accessLog = createLogger({
  format: combine(
    label({ label: 'Info' }),
    timestamp(),
    myFormat
  ),
  transports: [
    new transports.File({filename: path.join(logPath, 'access.log'), tailable: true}),
    new transports.Console()
  ]
})

const errorLog = createLogger({
  format: combine(
    label({ label: 'Error' }),
    timestamp(),
    myFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({filename: path.join(logPath, 'errors.log'), tailable: true})
  ]
})

module.exports = {
  errorLog: errorLog,
  accessLog: accessLog
}
