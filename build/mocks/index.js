'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _Tweet = require('../models/Tweet');

var _Tweet2 = _interopRequireDefault(_Tweet);

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var TWEETS_TOTAL = 3;
var USER_TOTAL = 3;

exports.default = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
            switch (_context3.prev = _context3.next) {
                case 0:
                    _context3.prev = 0;
                    _context3.next = 3;
                    return Array.from({ length: USER_TOTAL }).forEach(function () {
                        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, i) {
                            var user;
                            return regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                    switch (_context.prev = _context.next) {
                                        case 0:
                                            user = _User2.default.create({
                                                username: _faker2.default.internet.userName(),
                                                firstName: _faker2.default.name.firstName(),
                                                lastName: _faker2.default.name.lastName(),
                                                email: _faker2.default.internet.email(),
                                                avatar: 'https://randomuser.me/api/portraits/women/' + i + '.jpg',
                                                password: "motion"
                                            });

                                        case 1:
                                        case 'end':
                                            return _context.stop();
                                    }
                                }
                            }, _callee, undefined);
                        }));

                        return function (_x, _x2) {
                            return _ref2.apply(this, arguments);
                        };
                    }());

                case 3:
                    _context3.next = 5;
                    return Array.from({ length: TWEETS_TOTAL }).forEach(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                            while (1) {
                                switch (_context2.prev = _context2.next) {
                                    case 0:
                                        _context2.next = 2;
                                        return _Tweet2.default.create({
                                            text: _faker2.default.lorem.sentence(),
                                            user: user._id
                                        });

                                    case 2:
                                        return _context2.abrupt('return', _context2.sent);

                                    case 3:
                                    case 'end':
                                        return _context2.stop();
                                }
                            }
                        }, _callee2, undefined);
                    })));

                case 5:
                    _context3.next = 10;
                    break;

                case 7:
                    _context3.prev = 7;
                    _context3.t0 = _context3['catch'](0);
                    throw _context3.t0;

                case 10:
                case 'end':
                    return _context3.stop();
            }
        }
    }, _callee3, undefined, [[0, 7]]);
}));
//# sourceMappingURL=index.js.map