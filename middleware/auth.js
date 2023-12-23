import jwt from "jsonwebtoken";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";

export const auth = async (req, res, next) => {
    // const headers = req.headers;
    const authHeader = req.headers.authorization;
    // console.log(authHeader);
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError('Authentication Invalid');
    }

    const token = authHeader.split(' ')[1];
    // console.log(token, 'jwt token array index 1');
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(payload, 'paloadsssssssssss');
        // ===============
        // payload is :- {
        //   userId: '657d4da4a7d27d18e9877cd3',
        //   iat: 1702806195,
        //   exp: 1702892595
        // }
        // ===============
        // req.user = payload;
        // if (payload.userId === '657d4e18a7d27d18e9877cd6') {
        //     throw new UnAuthorizedError('test user does not have permissions to update user details!')
        // } else {
            const testUser = payload.userId === '657d4e18a7d27d18e9877cd6'
            req.user = { userId: payload.userId, testUser };
            // next();
        // }
        next();
    } catch (error) {
        throw new UnauthenticatedError('Authentication invalid, token invalid');
    }
}

export const checkForTestUser = (req, res, next) => {
    if(req.user.testUser) throw new BadRequestError("Demo user. Read only!");
    next();
}