const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');


const logEvents = async (message, logFileName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        let logsFolder = path.join(__dirname, '..', 'logs')
        if (!fs.existsSync(logsFolder)) {
            await fsPromises.mkdir(logsFolder)
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem);
    } catch (error) {
        console.log(error);
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'refLog.log');
    console.log(`${req.method} ${req.path}`);
    next();
}

module.exports = { logEvents, logger };