import CustomError from './custom-error';
import HTTP_STATUS from '../utils/http-status';

class UnauthorizedError extends CustomError {
  constructor(message = 'Требуется авторизация') {
    super(message, HTTP_STATUS.UNAUTHORIZED);
  }
}

export default UnauthorizedError;
