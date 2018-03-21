import jwt from 'jsonwebtoken';
import constants from '../config/constants';
import User from '../models/User';

//Checking if user is authenticated or not before executing request
export async function requireAuth(user) {
    //Checking if the user context is valid or null
    if (!user || !user._id) {
        throw new Error('Unauthorized');
    }
    //Verifying user id from our database
    const me = await User.findById(user._id);
    if (!me) {
        throw new Error('Unauthorized');
    }
    return me;
}
//Decoding json web token from the user request headers
export function decodeToken(token) {
    //Getting the Bearer from the headers
    const arr = token.split(' ');
    if (arr[0] === 'Bearer') {
        //Verifying and validating token
        return jwt.verify(arr[1], constants.JWT_SECRET);
    }
    throw new Error('Invalid token');
}