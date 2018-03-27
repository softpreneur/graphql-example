'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _User = require('../../models/User');

var _User2 = _interopRequireDefault(_User);

var _auth = require('../../services/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
  //Updating new user name or un-verify user after successfully verification of phone
  create_account: function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, _ref) {
      var phone = _ref.phone,
          fname = _ref.fname,
          lname = _ref.lname,
          email = _ref.email,
          password = _ref.password;
      var user;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _User2.default.findOne({ phone: phone });

            case 3:
              user = _context.sent;

              if (user) {
                _context.next = 8;
                break;
              }

              _context.next = 7;
              return _User2.default.create({ phone: phone, lname: lname, fname: fname, email: email, password: password });

            case 7:
              user = _context.sent;

            case 8:
              return _context.abrupt('return', {
                token: user.createToken()
              });

            case 11:
              _context.prev = 11;
              _context.t0 = _context['catch'](0);
              throw _context.t0;

            case 14:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[0, 11]]);
    }));

    function create_account(_x, _x2) {
      return _ref2.apply(this, arguments);
    }

    return create_account;
  }(),
  //Returning current logged user
  me: function () {
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
              return _context2.abrupt('return', _context2.sent);

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

    function me(_x3, _x4, _x5) {
      return _ref4.apply(this, arguments);
    }

    return me;
  }()
};
//# sourceMappingURL=users-resolvers.js.map