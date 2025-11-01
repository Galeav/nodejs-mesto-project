import CustomError from './custom-error';
import HTTP_STATUS from '../utils/http-status';

class ForbiddenError extends CustomError {
  constructor(message = 'Доступ запрещён') {
    super(message, HTTP_STATUS.FORBIDDEN);
  }
}

export default ForbiddenError;
