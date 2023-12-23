class ApiError extends Error {
    constructor(message){
        super(message);
        // this.statusCode = StatusCodes.BAD_REQUEST;
    }
}

export default ApiError;