const winston = require('winston');
const { json, simple } = winston.format;
const { File, Console } = winston.transports;

const logger = winston.createLogger({
    level: 'silly',
    format: json(),
    transports: [
        new File({ filename: './winston/logs/error.log', level: 'error' }),
        new File({ filename: './winston/logs/info.log', level: 'info' }),
        new File({ filename: './winston/logs/debug.log', level: 'debug' })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new Console({ format: simple() })
    );
}

module.exports = logger;
