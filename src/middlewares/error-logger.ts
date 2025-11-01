import expressWinston from 'express-winston';
import { format, transports } from 'winston';

const errorLogger = expressWinston.errorLogger({
  transports: [
    new transports.File({ filename: 'error.log' }),
  ],
  format: format.json(),
});

export default errorLogger;
