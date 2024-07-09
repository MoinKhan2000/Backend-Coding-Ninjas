import winston from "winston";
import fs from 'fs'


export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { service: 'request-logging' },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.txt', level: 'error' }),
    new winston.transports.File({ filename: 'log.txt' })
  ]
});

export const loggerMiddleware = async (req, res, next) => {
  let logData = '\n' + new Date().toLocaleString() + '\n' + `\n req URL: ${req.url} \n reqBody: ${JSON.stringify(req.body)}`
  // log(logData)
  logger.info(logData)
  next();
};
