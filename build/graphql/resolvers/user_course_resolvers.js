'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _UserCourse = require('../../models/Courses/UserCourse');

var _UserCourse2 = _interopRequireDefault(_UserCourse);

var _auth = require('../../services/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
    //Adding new course by user ... (Joining)
    user_join_course: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, args, _ref) {
            var user = _ref.user;
            var userJoin;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.prev = 0;
                            _context.next = 3;
                            return (0, _auth.requireAuth)(user);

                        case 3:
                            _context.next = 5;
                            return _UserCourse2.default.create(_extends({ user: user._id }, args));

                        case 5:
                            userJoin = _context.sent;

                            if (!userJoin) {
                                _context.next = 10;
                                break;
                            }

                            return _context.abrupt('return', {
                                message: "success",
                                value: true
                            });

                        case 10:
                            return _context.abrupt('return', {
                                message: "failed",
                                value: false
                            });

                        case 11:
                            _context.next = 16;
                            break;

                        case 13:
                            _context.prev = 13;
                            _context.t0 = _context['catch'](0);
                            return _context.abrupt('return', {
                                message: "error",
                                value: false
                            });

                        case 16:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined, [[0, 13]]);
        }));

        function user_join_course(_x, _x2, _x3) {
            return _ref2.apply(this, arguments);
        }

        return user_join_course;
    }(),
    //List of courses logged user has joined
    user_joined_courses: function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, args, _ref3) {
            var user = _ref3.user;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.prev = 0;
                            _context2.next = 3;
                            return (0, _auth.requireAuth)(user);

                        case 3:
                            return _context2.abrupt('return', _UserCourse2.default.find({ user: user._id }).limit(7));

                        case 6:
                            _context2.prev = 6;
                            _context2.t0 = _context2['catch'](0);
                            throw _context2.t0;

                        case 9:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined, [[0, 6]]);
        }));

        function user_joined_courses(_x4, _x5, _x6) {
            return _ref4.apply(this, arguments);
        }

        return user_joined_courses;
    }()

};
//# sourceMappingURL=user_course_resolvers.js.map