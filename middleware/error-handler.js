import { StatusCodes } from 'http-status-codes';

const errorMiddleware = (err, req, res, next) => {
    console.log(err);
    // console.log(err.message); // message is predefined in Error constructor
    const defaultError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong, please try again later!'
    }
    if (err.name === 'ValidationError') {
        defaultError.statusCode = StatusCodes.BAD_REQUEST
        // defaultError.msg = err.message
        defaultError.msg = Object.values(err.errors)
            .map(item => item.message)
            .join(', ');
    } 
    if(err.code && err.code === 11000){
         defaultError.statusCode = StatusCodes.BAD_REQUEST
         defaultError.msg = `${Object.keys(err.keyValue)} field must be unique`
    }
    // console.log(err.name);
    res.status(defaultError.statusCode).json({ msg: defaultError.msg });
    // res.status(defaultError.statusCode).json({ msg: err });
}

export default errorMiddleware;