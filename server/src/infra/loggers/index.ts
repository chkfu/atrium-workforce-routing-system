import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, colorize, errors, json } = format;

//  Setup message format

const msg_format = printf(({ level, message, label, timestamp, stack }) => {
  const log_message = stack || message;
  return `${timestamp} | [${label || 'API'}] | ${level}: ${log_message}`;
});

//  Setup logging criteria

const cust_format = combine(
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  errors({ stack: true }),
  msg_format,
);

const cust_transports = (output_filename: string) => {
  output_filename = String(output_filename);
  return [
    new transports.Console({
      format: combine(colorize(), cust_format),
    }),
    new transports.File({
      filename: `logs/${output_filename}.log`,
      level: 'error',
    }),
  ];
};

//  Setup loggers

export const app_logger = createLogger({
  format: cust_format,
  transports: cust_transports('app_logger'),
});

export const auth_logger = createLogger({
  format: cust_format,
  transports: cust_transports('auth_logger'),
});

export const http_logger = createLogger({
  format: cust_format,
  transports: cust_transports('http_logger'),
});

export const critical_logger = createLogger({
  format: cust_format,
  transports: cust_transports('critical_logger'),
});

export default {
  app_logger,
  auth_logger,
  http_logger,
  critical_logger,
};
