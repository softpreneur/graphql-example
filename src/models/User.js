import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import { hashSync, compareSync } from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import constants from '../config/constants';
const UserSchema = new Schema({
    fname: String,
    lname: String,
    phone: {
        type: String,
        unique: true
    },
    password: String,
    sector: {
        type: String
    },
    email: String,
}, { collection: 'users' });
//Adding timestamps to each user created
UserSchema.plugin(timestamps);
//Creating user model methods 
UserSchema.pre('save', function(next) {
    if (this.isModified('password')) {
        this.password = this._hashPassword(this.password);
        return next();
    }
    return next();
});

UserSchema.methods = {
    createToken() {
        return jwt.sign({
                _id: this._id
            },
            constants.JWT_SECRET
        )
    },
    _hashPassword(password) {
        return hashSync(password);
    },
    //Only applicable if we choose to use password
    verifyPass(password) {
        return compareSync(password, this.password);
    },
    
}
export default mongoose.model('User', UserSchema);