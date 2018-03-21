import bodyParser from 'body-parser';
//import constants from './constants';
import { decodeToken } from '../services/auth';

//Getting jwt from user's request headers
async function auth(req, res, next) {
    try {
        //Making sure headers is not null or undefined
        const token = req.headers.authorization;
        if (token != null) {
            //Passing the headers for validation and verification   
            const user = await decodeToken(token);
            req.user = user;
        } else {
            req.user = null;
        }
        return next();
    } catch (error) {
        throw error
    }
}

export default app => {
    app.use(bodyParser.json());
    app.use(auth);
}