import fs from 'fs'
import winston from 'winston';
const fsPromise = fs.promises;

const logger = winston.createLogger({
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
})

export const loggerMiddleware = async (req, res, next) => {
  let logData = '\n' + new Date().toLocaleDateString() + '\n' + `\n req URL: ${req.url} \n reqBody: ${JSON.stringify(req.body)}`
  // log(logData)
  logger.info(logData)
  next();
};

export default loggerMiddleware;
