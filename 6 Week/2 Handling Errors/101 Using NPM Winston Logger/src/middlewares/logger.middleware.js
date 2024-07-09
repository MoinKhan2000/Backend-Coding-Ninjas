// Please don't change the pre-written code
// Import the necessary modules here
import fs from 'fs'
import winston from 'winston'
const fsPromise = fs.promises

// Write your code here
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
})

export const loggerMiddleware = async (req, res, next) => {
  let logData = '\n' + new Date().toLocaleDateString() + '\n' + `\n req URL: ${req.url} \n reqBody: ${JSON.stringify(req.body)}`
  // log(logData)
  logger.info(logData)
  next();
};
export default loggerMiddleware;
