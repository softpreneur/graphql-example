'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _schools = require('../../services/schools');

var _schools2 = _interopRequireDefault(_schools);

var _faculties = require('../../services/faculties');

var _faculties2 = _interopRequireDefault(_faculties);

var _courses = require('../../services/courses');

var _courses2 = _interopRequireDefault(_courses);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Fuse = require('fuse.js');
//Importing list of schools

var schools = Object.values(_schools2.default);
//Importing list of faculties

var faculties = Object.values(_faculties2.default);
//Importing list of courses

var courses = Object.values(_courses2.default);
exports.default = {
    //Seaching list of schools....
    get_schools: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, _ref, _ref2) {
            var char = _ref.char;
            var user = _ref2.user;
            var options, fuse, result;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.prev = 0;

                            //Options for search
                            options = { shouldSort: true, threshold: 0.8, location: 0, distance: 100, maxPatternLength: 32, minMatchCharLength: 1, keys: ["name", "code"] };

                            console.log(schools.length);
                            fuse = new Fuse(schools, options);
                            result = fuse.search(char);
                            return _context.abrupt('return', result);

                        case 8:
                            _context.prev = 8;
                            _context.t0 = _context['catch'](0);
                            throw _context.t0;

                        case 11:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined, [[0, 8]]);
        }));

        function get_schools(_x, _x2, _x3) {
            return _ref3.apply(this, arguments);
        }

        return get_schools;
    }(),
    //Searching the list of faculties
    get_faculties: function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, _ref4, _ref5) {
            var char = _ref4.char;
            var user = _ref5.user;
            var options, fuse, result;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.prev = 0;

                            //Options for search
                            options = { shouldSort: true, threshold: 0.8, location: 0, distance: 100, maxPatternLength: 32, minMatchCharLength: 1, keys: ["name"] };

                            console.log(faculties.length);
                            fuse = new Fuse(faculties, options);
                            result = fuse.search(char);
                            return _context2.abrupt('return', result);

                        case 8:
                            _context2.prev = 8;
                            _context2.t0 = _context2['catch'](0);
                            throw _context2.t0;

                        case 11:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined, [[0, 8]]);
        }));

        function get_faculties(_x4, _x5, _x6) {
            return _ref6.apply(this, arguments);
        }

        return get_faculties;
    }(),
    //Searching the list of courses......
    get_courses: function () {
        var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_, _ref7, _ref8) {
            var char = _ref7.char;
            var user = _ref8.user;
            var options, fuse, result;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.prev = 0;

                            //Options for search
                            options = { shouldSort: true, threshold: 0.8, location: 0, distance: 100, maxPatternLength: 32, minMatchCharLength: 1, keys: ["name"] };

                            console.log(courses.length);
                            fuse = new Fuse(courses, options);
                            result = fuse.search(char);
                            return _context3.abrupt('return', result);

                        case 8:
                            _context3.prev = 8;
                            _context3.t0 = _context3['catch'](0);
                            throw _context3.t0;

                        case 11:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, undefined, [[0, 8]]);
        }));

        function get_courses(_x7, _x8, _x9) {
            return _ref9.apply(this, arguments);
        }

        return get_courses;
    }()
};
//# sourceMappingURL=seach_resolvers.js.map