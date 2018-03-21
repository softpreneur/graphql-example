'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Post = require('../../models/Posts/Post');

var _Post2 = _interopRequireDefault(_Post);

var _CommentUpvote = require('../../models/Posts/CommentUpvote');

var _CommentUpvote2 = _interopRequireDefault(_CommentUpvote);

var _CommentDownvote = require('../../models/Posts/CommentDownvote');

var _CommentDownvote2 = _interopRequireDefault(_CommentDownvote);

var _PostComment = require('../../models/Posts/PostComment');

var _PostComment2 = _interopRequireDefault(_PostComment);

var _auth = require('../../services/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
  //Currently logged in user answering questions
  create_post_comment: function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, args, _ref) {
      var user = _ref.user;
      var comment;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return (0, _auth.requireAuth)(user);

            case 3:
              _context.next = 5;
              return _PostComment2.default.create(_extends({ user: user._id }, args));

            case 5:
              comment = _context.sent;

              if (!comment) {
                _context.next = 10;
                break;
              }

              _context.next = 9;
              return _Post2.default.update({ _id: comment.post }, { $inc: { no_answers: +1 } });

            case 9:
              return _context.abrupt('return', comment);

            case 10:
              throw new Error("An error occured");

            case 13:
              _context.prev = 13;
              _context.t0 = _context['catch'](0);
              throw _context.t0;

            case 16:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[0, 13]]);
    }));

    function create_post_comment(_x, _x2, _x3) {
      return _ref2.apply(this, arguments);
    }

    return create_post_comment;
  }(),
  //Getting the last 7 answers
  post_comments: function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, _ref3, _ref4) {
      var post = _ref3.post,
          cursor = _ref3.cursor,
          limit = _ref3.limit;
      var user = _ref4.user;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return (0, _auth.requireAuth)(user);

            case 3:
              if (!cursor) {
                _context2.next = 7;
                break;
              }

              _context2.next = 6;
              return _PostComment2.default.find({ post: post, createdAt: { $lt: cursor } }).limit(limit);

            case 6:
              return _context2.abrupt('return', _context2.sent);

            case 7:
              _context2.next = 9;
              return _PostComment2.default.find({ post: post }).limit(limit);

            case 9:
              return _context2.abrupt('return', _context2.sent);

            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2['catch'](0);
              throw _context2.t0;

            case 15:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[0, 12]]);
    }));

    function post_comments(_x4, _x5, _x6) {
      return _ref5.apply(this, arguments);
    }

    return post_comments;
  }(),
  upvote_post_comment: function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_, _ref6, _ref7) {
      var comment = _ref6.comment;
      var user = _ref7.user;
      var check, v;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return (0, _auth.requireAuth)(user);

            case 3:
              _context3.next = 5;
              return _CommentUpvote2.default.findOne({
                user: user._id,
                comment: comment
              });

            case 5:
              check = _context3.sent;
              v = void 0;

              if (check) {
                _context3.next = 15;
                break;
              }

              _context3.next = 10;
              return _CommentUpvote2.default.create({ user: user._id, comment: comment });

            case 10:
              _context3.next = 12;
              return _PostComment2.default.update({ _id: comment }, { $inc: { upvote_no: +1 } });

            case 12:
              v = true;
              _context3.next = 20;
              break;

            case 15:
              _context3.next = 17;
              return _CommentUpvote2.default.remove({ user: user._id, comment: comment });

            case 17:
              _context3.next = 19;
              return _PostComment2.default.update({ _id: comment }, { $inc: { upvote_no: -1 } });

            case 19:
              v = false;

            case 20:
              return _context3.abrupt('return', { message: "success", value: v });

            case 23:
              _context3.prev = 23;
              _context3.t0 = _context3['catch'](0);
              return _context3.abrupt('return', {
                message: "error",
                value: true
              });

            case 26:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined, [[0, 23]]);
    }));

    function upvote_post_comment(_x7, _x8, _x9) {
      return _ref8.apply(this, arguments);
    }

    return upvote_post_comment;
  }(),
  downvote_post_comment: function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_, _ref9, _ref10) {
      var comment = _ref9.comment;
      var user = _ref10.user;
      var check, v;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return (0, _auth.requireAuth)(user);

            case 3:
              _context4.next = 5;
              return _CommentDownvote2.default.findOne({
                user: user._id,
                comment: comment
              });

            case 5:
              check = _context4.sent;
              v = void 0;

              if (check) {
                _context4.next = 15;
                break;
              }

              _context4.next = 10;
              return _CommentDownvote2.default.create({ user: user._id, comment: comment });

            case 10:
              _context4.next = 12;
              return _PostComment2.default.update({ _id: comment }, { $inc: { downvote_no: +1 } });

            case 12:
              v = true;
              _context4.next = 20;
              break;

            case 15:
              _context4.next = 17;
              return _CommentDownvote2.default.remove({ user: user._id, comment: comment });

            case 17:
              _context4.next = 19;
              return _PostComment2.default.update({ _id: comment }, { $inc: { downvote_no: -1 } });

            case 19:
              v = false;

            case 20:
              return _context4.abrupt('return', { message: "success", value: v });

            case 23:
              _context4.prev = 23;
              _context4.t0 = _context4['catch'](0);
              return _context4.abrupt('return', {
                message: "error",
                value: true
              });

            case 26:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined, [[0, 23]]);
    }));

    function downvote_post_comment(_x10, _x11, _x12) {
      return _ref11.apply(this, arguments);
    }

    return downvote_post_comment;
  }()
};
//# sourceMappingURL=comments-resolvers.js.map