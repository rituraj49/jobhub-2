import { StatusCodes } from "http-status-codes";
import ApiError from "./custom-error.js";

class UnauthenticatedError extends ApiError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}

export default UnauthenticatedError;