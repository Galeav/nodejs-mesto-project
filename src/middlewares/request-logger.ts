import expressWinston from 'express-winston';
import { format, transports } from 'winston';

const requestLogger = expressWinston.logger({
  transports: [
    new transports.File({ filename: 'request.log' }),
  ],
  format: format.json(),
  meta: true,
});

export default requestLogger;
