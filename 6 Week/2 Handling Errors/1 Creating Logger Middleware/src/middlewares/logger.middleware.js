import fs from 'fs'
const fsPromise = fs.promises;

async function log(logData) {
  try {
    await fs.promises.appendFile("log.txt", logData)
  } catch (error) {
    console.log(error);
  }
}
// Write your code here

export const loggerMiddleware = async (req, res, next) => {
  let logData = '\n' + new Date().toLocaleDateString() + '\n' + `\n req URL: ${req.url} \n reqBody: ${JSON.stringify(req.body)}`
  log(logData)
  next();
};
export default loggerMiddleware;
