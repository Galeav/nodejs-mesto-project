import CustomError from './custom-error';
import HTTP_STATUS from '../utils/http-status';

class BadRequestError extends CustomError {
  constructor(message = 'Переданы некорректные данные') {
    super(message, HTTP_STATUS.BAD_REQUEST);
  }
}

export default BadRequestError;
