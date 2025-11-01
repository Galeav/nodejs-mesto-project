import CustomError from './custom-error';
import HTTP_STATUS from '../utils/http-status';

class NotFoundError extends CustomError {
  constructor(message = 'Не найдено') {
    super(message, HTTP_STATUS.NOT_FOUND);
  }
}

export default NotFoundError;
