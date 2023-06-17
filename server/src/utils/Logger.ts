import winston from 'winston';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
  http: 4,
};

const level = () => {
  const env = process.env.NODE_ENV || 'staging';
  const isStaging = env === 'staging';
  return isStaging ? 'debug' : 'info';
};

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.printf(({ timestamp, level, message }) => {
    return `${timestamp}] ${level}: ${message}`;
  }),
);

const transports = [new winston.transports.Console()];

const Logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

export default Logger;
