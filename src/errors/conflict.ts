import CustomError from './custom-error';
import HTTP_STATUS from '../utils/http-status';

class ConflictError extends CustomError {
  constructor(message = 'Данные уже используются') {
    super(message, HTTP_STATUS.CONFLICT);
  }
}

export default ConflictError;
