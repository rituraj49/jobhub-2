import { StatusCodes } from 'http-status-codes';
import ApiError from './custom-error.js';

class NotFoundError extends ApiError {
    constructor(message){
        super(message);
        this.statusCode = StatusCodes.NOT_FOUND;
    }
}

export default NotFoundError;