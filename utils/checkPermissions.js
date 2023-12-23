import { UnauthenticatedError } from "../errors/index.js";

const checkPermissions = (requestUser, resourceId) => {
    // if(requestUser.role === 'admin') return
    if(requestUser.userId === resourceId.toString()) return;
    // if(requestUser.userId === '657d4e18a7d27d18e9877cd6') {
    //     throw new UnauthenticatedError('Test user cannot perform the selected operation');
    // }
    throw new UnauthenticatedError("user does not have sufficient permissions to view this job!");
}

export default checkPermissions;