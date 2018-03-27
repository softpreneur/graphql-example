'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseTimestamp = require('mongoose-timestamp');

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

var _bcryptNodejs = require('bcrypt-nodejs');

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _constants = require('../config/constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserSchema = new _mongoose.Schema({
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
    email: String
}, { collection: 'users' });
//Adding timestamps to each user created
UserSchema.plugin(_mongooseTimestamp2.default);
//Creating user model methods 
UserSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        this.password = this._hashPassword(this.password);
        return next();
    }
    return next();
});

UserSchema.methods = {
    createToken: function createToken() {
        return _jsonwebtoken2.default.sign({
            _id: this._id
        }, _constants2.default.JWT_SECRET);
    },
    _hashPassword: function _hashPassword(password) {
        return (0, _bcryptNodejs.hashSync)(password);
    },

    //Only applicable if we choose to use password
    verifyPass: function verifyPass(password) {
        return (0, _bcryptNodejs.compareSync)(password, this.password);
    }
};
exports.default = _mongoose2.default.model('User', UserSchema);
//# sourceMappingURL=User.js.map