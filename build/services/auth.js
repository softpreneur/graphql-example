'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.requireAuth = undefined;

//Checking if user is authenticated or not before executing request
var requireAuth = exports.requireAuth = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(user) {
        var me;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (!(!user || !user._id)) {
                            _context.next = 2;
                            break;
                        }

                        throw new Error('Unauthorized');

                    case 2:
                        _context.next = 4;
                        return _User2.default.findById(user._id);

                    case 4:
                        me = _context.sent;

                        if (me) {
                            _context.next = 7;
                            break;
                        }

                        throw new Error('Unauthorized');

                    case 7:
                        return _context.abrupt('return', me);

                    case 8:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function requireAuth(_x) {
        return _ref.apply(this, arguments);
    };
}();
//Decoding json web token from the user request headers


exports.decodeToken = decodeToken;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _constants = require('../config/constants');

var _constants2 = _interopRequireDefault(_constants);

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function decodeToken(token) {
    //Getting the Bearer from the headers
    var arr = token.split(' ');
    if (arr[0] === 'Bearer') {
        //Verifying and validating token
        return _jsonwebtoken2.default.verify(arr[1], _constants2.default.JWT_SECRET);
    }
    throw new Error('Invalid token');
}
//# sourceMappingURL=auth.js.map