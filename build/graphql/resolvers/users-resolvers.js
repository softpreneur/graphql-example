'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _User = require('../../models/User');

var _User2 = _interopRequireDefault(_User);

var _Feedback = require('../../models/Feedback');

var _Feedback2 = _interopRequireDefault(_Feedback);

var _auth = require('../../services/auth');

var _NewCoin = require('../../models/NewCoin');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
  //Checking user phone number if it exist in database
  phone_check: function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, _ref) {
      var phone = _ref.phone;
      var user, msg, v;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _User2.default.findOne({ phone: phone }, { school: 1, _id: 0 });

            case 3:
              user = _context.sent;

              //If user phone number exist
              msg = 'new_user', v = true;

              if (user) {
                //Checking if the school exist
                if (user.school) {
                  msg = 'profile_completed';
                  v = true;
                } else {
                  msg = "profile_incomplete";
                  v = true;
                }
              }
              return _context.abrupt('return', {
                message: msg,
                value: v
              });

            case 9:
              _context.prev = 9;
              _context.t0 = _context['catch'](0);
              return _context.abrupt('return', {
                message: "error",
                value: true
              });

            case 12:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[0, 9]]);
    }));

    function phone_check(_x, _x2) {
      return _ref2.apply(this, arguments);
    }

    return phone_check;
  }(),
  //Updating new user name or un-verify user after successfully verification of phone
  update_name: function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, _ref3) {
      var phone = _ref3.phone,
          fname = _ref3.fname,
          lname = _ref3.lname;
      var user;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _User2.default.findOne({ phone: phone });

            case 3:
              user = _context2.sent;

              if (user) {
                _context2.next = 8;
                break;
              }

              _context2.next = 7;
              return _User2.default.create({ phone: phone, lname: lname, fname: fname });

            case 7:
              user = _context2.sent;

            case 8:
              return _context2.abrupt('return', {
                token: user.createToken()
              });

            case 11:
              _context2.prev = 11;
              _context2.t0 = _context2['catch'](0);
              throw _context2.t0;

            case 14:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[0, 11]]);
    }));

    function update_name(_x3, _x4) {
      return _ref4.apply(this, arguments);
    }

    return update_name;
  }(),
  //Updating full account details on successful login
  update_account: function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_, _ref5, _ref6) {
      var school = _ref5.school,
          faculty = _ref5.faculty,
          department = _ref5.department,
          level = _ref5.level,
          dob = _ref5.dob;
      var user = _ref6.user;
      var userUpdate;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return (0, _auth.requireAuth)(user);

            case 3:
              _context3.next = 5;
              return _User2.default.update({ _id: user._id }, { $set: { school: school, faculty: faculty, department: department, dob: dob, level: level } });

            case 5:
              userUpdate = _context3.sent;

              if (!userUpdate) {
                _context3.next = 8;
                break;
              }

              return _context3.abrupt('return', {
                message: "success",
                value: true
              });

            case 8:
              _context3.next = 13;
              break;

            case 10:
              _context3.prev = 10;
              _context3.t0 = _context3['catch'](0);
              return _context3.abrupt('return', {
                message: "error",
                value: false
              });

            case 13:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined, [[0, 10]]);
    }));

    function update_account(_x5, _x6, _x7) {
      return _ref7.apply(this, arguments);
    }

    return update_account;
  }(),
  //Returning current logged user
  me: function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_, args, _ref8) {
      var user = _ref8.user;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return (0, _auth.requireAuth)(user);

            case 3:
              return _context4.abrupt('return', _context4.sent);

            case 6:
              _context4.prev = 6;
              _context4.t0 = _context4['catch'](0);
              throw _context4.t0;

            case 9:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined, [[0, 6]]);
    }));

    function me(_x8, _x9, _x10) {
      return _ref9.apply(this, arguments);
    }

    return me;
  }(),
  //For admin use only
  add_coin: function () {
    var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_, _ref10, _ref11) {
      var userId = _ref10.userId,
          number = _ref10.number,
          ref_code = _ref10.ref_code;
      var user = _ref11.user;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _User2.default.update({ _id: userId }, { coin: number });

            case 3:
              _context5.next = 5;
              return _NewCoin.NewCoin.create({ user: userId, no_coin: number, ref_code: ref_code });

            case 5:
              return _context5.abrupt('return', {
                message: "success",
                value: true
              });

            case 8:
              _context5.prev = 8;
              _context5.t0 = _context5['catch'](0);
              return _context5.abrupt('return', {
                message: "error",
                value: false
              });

            case 11:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined, [[0, 8]]);
    }));

    function add_coin(_x11, _x12, _x13) {
      return _ref12.apply(this, arguments);
    }

    return add_coin;
  }(),
  submit_suggestion: function () {
    var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_, _ref13, _ref14) {
      var suggestion_type = _ref13.suggestion_type,
          content = _ref13.content;
      var user = _ref14.user;
      var check;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return (0, _auth.requireAuth)(user);

            case 3:
              _context6.next = 5;
              return _Feedback2.default.findOne({ user: user._id, suggestion_type: suggestion_type, content: content });

            case 5:
              check = _context6.sent;

              if (check) {
                _context6.next = 9;
                break;
              }

              _context6.next = 9;
              return _Feedback2.default.create({ user: user._id, suggestion_type: suggestion_type, content: content });

            case 9:
              return _context6.abrupt('return', {
                message: "success",
                value: true
              });

            case 12:
              _context6.prev = 12;
              _context6.t0 = _context6['catch'](0);
              return _context6.abrupt('return', {
                message: "error",
                value: true
              });

            case 15:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, undefined, [[0, 12]]);
    }));

    function submit_suggestion(_x14, _x15, _x16) {
      return _ref15.apply(this, arguments);
    }

    return submit_suggestion;
  }(),
  user_suggestions: function () {
    var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(_, args, _ref16) {
      var user = _ref16.user;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return _Feedback2.default.find({}).limit(20);

            case 3:
              return _context7.abrupt('return', _context7.sent);

            case 6:
              _context7.prev = 6;
              _context7.t0 = _context7['catch'](0);
              throw _context7.t0;

            case 9:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, undefined, [[0, 6]]);
    }));

    function user_suggestions(_x17, _x18, _x19) {
      return _ref17.apply(this, arguments);
    }

    return user_suggestions;
  }()
};
//# sourceMappingURL=users-resolvers.js.map