const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize, splat, simple, errors } = format;

const timezoneDateString = () => {
	return new Date().toLocaleString('en-US', {
		timeZone: 'Asia/Kolkata',
	});
};
const logFormat = printf(({ level, timestamp, message, stack }) => {
	return `[${timestamp}] - ${level}: ${stack || message}`;
});

const logger = createLogger({
	level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
	format: combine(colorize(), timestamp({ format: timezoneDateString }), splat(), simple(), logFormat, errors({ stack: true })),
	transports: [new transports.Console()],
});

module.exports = logger;