import fs from 'fs'
const fsPromise = fs.promises;

async function log(logData) {
        try {
                logData = '\n' + new Date().toLocaleString() + '. Log Data : ' + logData
                console.log('Hii');
                await fs.promises.appendFile("log.txt", logData)
        } catch (error) {
                console.log(error);
        }
}
const loggerMiddleware = async (req, res, next) => {
        // 1 Log request body
        if (!req.url.includes('signin')) {
                let logData = `${(req.url)}- ${JSON.stringify(req.body)}`
                await log(logData)
        }
        next();
}

export default loggerMiddleware