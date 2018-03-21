'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _auth = require('../../services/auth');

var _Course = require('../../models/Courses/Course');

var _Course2 = _interopRequireDefault(_Course);

var _Sumaryzer = require('../../models/Courses/Sumaryzer');

var _Sumaryzer2 = _interopRequireDefault(_Sumaryzer);

var _CoursesAllowed = require('../../models/Courses/CoursesAllowed');

var _CoursesAllowed2 = _interopRequireDefault(_CoursesAllowed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
    //Adding sumaryzer's application to list of pending sumaryzers
    become_sumaryzer: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, args, _ref) {
            var user = _ref.user;
            var userInfo, sumaryzer;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.prev = 0;
                            _context.next = 3;
                            return (0, _auth.requireAuth)(user);

                        case 3:
                            userInfo = _context.sent;
                            _context.next = 6;
                            return _Sumaryzer2.default.findOne({ course_code: args.course_code, user: user });

                        case 6:
                            sumaryzer = _context.sent;

                            if (sumaryzer) {
                                _context.next = 10;
                                break;
                            }

                            _context.next = 10;
                            return _Sumaryzer2.default.create(_extends({ user: user._id }, args, { faculty: userInfo.faculty, school: userInfo.school }));

                        case 10:
                            return _context.abrupt('return', {
                                message: "success",
                                value: true
                            });

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

        function become_sumaryzer(_x, _x2, _x3) {
            return _ref2.apply(this, arguments);
        }

        return become_sumaryzer;
    }(),
    //Approving sumaryzers application
    approve_sumaryzer: function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, args, _ref3) {
            var user = _ref3.user;
            var userInfo, course;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.prev = 0;
                            _context2.next = 3;
                            return (0, _auth.requireAuth)(user);

                        case 3:
                            userInfo = _context2.sent;
                            _context2.next = 6;
                            return _Course2.default.findOne({ course_code: args.course_code, user: user });

                        case 6:
                            course = _context2.sent;

                            if (course) {
                                _context2.next = 14;
                                break;
                            }

                            _context2.next = 10;
                            return _Course2.default.create(_extends({ user: user._id }, args, { faculty: userInfo.faculty, school: userInfo.school }));

                        case 10:
                            _context2.next = 12;
                            return _Sumaryzer2.default.remove({ user: user._id, course_code: args.course_code });

                        case 12:
                            _context2.next = 14;
                            return _CoursesAllowed2.default.create({ user: user, course_code: args.course_code });

                        case 14:
                            return _context2.abrupt('return', {
                                message: "success",
                                value: true
                            });

                        case 17:
                            _context2.prev = 17;
                            _context2.t0 = _context2['catch'](0);
                            return _context2.abrupt('return', {
                                message: "error",
                                value: false
                            });

                        case 20:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined, [[0, 17]]);
        }));

        function approve_sumaryzer(_x4, _x5, _x6) {
            return _ref4.apply(this, arguments);
        }

        return approve_sumaryzer;
    }(),
    //Approving sumaryzers application
    decline_sumaryzer: function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_, args, _ref5) {
            var user = _ref5.user;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.prev = 0;
                            _context3.next = 3;
                            return _Sumaryzer2.default.remove({ course_code: args.course_code, user: user });

                        case 3:
                            return _context3.abrupt('return', {
                                message: "success",
                                value: true
                            });

                        case 6:
                            _context3.prev = 6;
                            _context3.t0 = _context3['catch'](0);
                            return _context3.abrupt('return', {
                                message: "error",
                                value: false
                            });

                        case 9:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, undefined, [[0, 6]]);
        }));

        function decline_sumaryzer(_x7, _x8, _x9) {
            return _ref6.apply(this, arguments);
        }

        return decline_sumaryzer;
    }(),
    //Getting list of sumaryzers application
    list_of_sumaryzers: function () {
        var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _context4.prev = 0;
                            return _context4.abrupt('return', _Sumaryzer2.default.find({}).limit(20).sort({ createdAt: -1 }));

                        case 4:
                            _context4.prev = 4;
                            _context4.t0 = _context4['catch'](0);
                            throw _context4.t0;

                        case 7:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, undefined, [[0, 4]]);
        }));

        function list_of_sumaryzers() {
            return _ref7.apply(this, arguments);
        }

        return list_of_sumaryzers;
    }(),
    //Getting list of courses by default before user search for courses
    courses: function () {
        var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_, args, _ref8) {
            var user = _ref8.user;
            var userInfo;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            _context5.prev = 0;
                            _context5.next = 3;
                            return (0, _auth.requireAuth)(user);

                        case 3:
                            userInfo = _context5.sent;
                            _context5.next = 6;
                            return _Course2.default.find({ $or: [{ $and: [{ school: userInfo.school, department: userInfo.department }] }, { faculty: userInfo.faculty }] }).limit(7);

                        case 6:
                            return _context5.abrupt('return', _context5.sent);

                        case 9:
                            _context5.prev = 9;
                            _context5.t0 = _context5['catch'](0);
                            throw _context5.t0;

                        case 12:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, undefined, [[0, 9]]);
        }));

        function courses(_x10, _x11, _x12) {
            return _ref9.apply(this, arguments);
        }

        return courses;
    }(),
    //Searching for course code by user
    search_course: function () {
        var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_, _ref10, _ref11) {
            var course_code = _ref10.course_code;
            var user = _ref11.user;
            var userInfo;
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            _context6.prev = 0;
                            _context6.next = 3;
                            return (0, _auth.requireAuth)(user);

                        case 3:
                            userInfo = _context6.sent;
                            return _context6.abrupt('return', _Course2.default.findOne({ $and: [{ course_code: course_code, school: userInfo.school }] }));

                        case 7:
                            _context6.prev = 7;
                            _context6.t0 = _context6['catch'](0);
                            throw _context6.t0;

                        case 10:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, undefined, [[0, 7]]);
        }));

        function search_course(_x13, _x14, _x15) {
            return _ref12.apply(this, arguments);
        }

        return search_course;
    }()
};
//# sourceMappingURL=courses-resolvers.js.map