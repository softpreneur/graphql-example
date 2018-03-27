'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Post = require('../../models/Posts/Post');

var _Post2 = _interopRequireDefault(_Post);

var _PostComment = require('../../models/Posts/PostComment');

var _PostComment2 = _interopRequireDefault(_PostComment);

var _auth = require('../../services/auth');

var _pubsub = require('../../config/pubsub');

var _User = require('../../models/User');

var _User2 = _interopRequireDefault(_User);

var _graphqlSubscriptions = require('graphql-subscriptions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var NEW_POST = "new_post";
var POST_COMMENT_ADDED = "post_comment_added";

exports.default = {
  //Creating post by logge user
  create_post: function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, _ref, _ref2) {
      var content = _ref.content,
          sector = _ref.sector;
      var user = _ref2.user;
      var userInfo, new_post;
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
              return _Post2.default.create({ user: user._id, content: content, sector: sector });

            case 6:
              new_post = _context.sent;

              //New post subscription
              _pubsub.pubsub.publish(NEW_POST, _defineProperty({}, NEW_POST, new_post));
              return _context.abrupt('return', new_post);

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

    function create_post(_x, _x2, _x3) {
      return _ref3.apply(this, arguments);
    }

    return create_post;
  }(),
  //Getting posts in users department or faculty
  posts: function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, _ref4, _ref5) {
      var cursor = _ref4.cursor,
          limit = _ref4.limit;
      var user = _ref5.user;
      var userInfo;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return (0, _auth.requireAuth)(user);

            case 3:
              userInfo = _context2.sent;

              if (!(cursor != undefined)) {
                _context2.next = 8;
                break;
              }

              _context2.next = 7;
              return _Post2.default.find({ sector: sector }).limit(limit).sort({ createdAt: -1 });

            case 7:
              return _context2.abrupt('return', _context2.sent);

            case 8:
              _context2.next = 10;
              return _Post2.default.find({ sector: sector }).limit(limit).sort({ createdAt: -1 });

            case 10:
              return _context2.abrupt('return', _context2.sent);

            case 13:
              _context2.prev = 13;
              _context2.t0 = _context2['catch'](0);
              throw _context2.t0;

            case 16:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[0, 13]]);
    }));

    function posts(_x4, _x5, _x6) {
      return _ref6.apply(this, arguments);
    }

    return posts;
  }(),
  //Getting psot created by logged user
  my_posts: function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_, _ref7, _ref8) {
      var cursor = _ref7.cursor,
          limit = _ref7.limit;
      var user = _ref8.user;
      var userInfo;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return (0, _auth.requireAuth)(user);

            case 3:
              userInfo = _context3.sent;

              if (!(cursor != undefined)) {
                _context3.next = 8;
                break;
              }

              _context3.next = 7;
              return _Post2.default.find({ user: user._id }, { createdAt: { $lt: cursor } }).limit(limit).sort({ createdAt: -1 });

            case 7:
              return _context3.abrupt('return', _context3.sent);

            case 8:
              _context3.next = 10;
              return _Post2.default.find({ user: user._id }).limit(limit).sort({ createdAt: -1 });

            case 10:
              return _context3.abrupt('return', _context3.sent);

            case 13:
              _context3.prev = 13;
              _context3.t0 = _context3['catch'](0);
              throw _context3.t0;

            case 16:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined, [[0, 13]]);
    }));

    function my_posts(_x7, _x8, _x9) {
      return _ref9.apply(this, arguments);
    }

    return my_posts;
  }(),
  //Currently logged in user answering questions
  create_post_comment: function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_, args, _ref10) {
      var user = _ref10.user;
      var comment, updated_post;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return (0, _auth.requireAuth)(user);

            case 3:
              _context4.next = 5;
              return _PostComment2.default.create(_extends({ user: user._id }, args));

            case 5:
              comment = _context4.sent;

              if (!comment) {
                _context4.next = 15;
                break;
              }

              _context4.next = 9;
              return _Post2.default.findByIdAndUpdate(comment.post, { $inc: { no_answers: +1 } }, { new: true });

            case 9:
              updated_post = _context4.sent;

              //Subscription for increase in number post comments
              _pubsub.pubsub.publish(POST_COMMENT_INCREASED, _defineProperty({}, POST_COMMENT_INCREASED, updated_post));
              //Subscription for new post comment
              _pubsub.pubsub.publish(POST_COMMENT_ADDED, _defineProperty({}, POST_COMMENT_ADDED, comment));
              return _context4.abrupt('return', comment);

            case 15:
              throw new Error("An error occured");

            case 16:
              _context4.next = 21;
              break;

            case 18:
              _context4.prev = 18;
              _context4.t0 = _context4['catch'](0);
              throw _context4.t0;

            case 21:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined, [[0, 18]]);
    }));

    function create_post_comment(_x10, _x11, _x12) {
      return _ref11.apply(this, arguments);
    }

    return create_post_comment;
  }(),
  //Getting the last 7 answers
  post_comments: function () {
    var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_, _ref12, _ref13) {
      var post = _ref12.post,
          cursor = _ref12.cursor,
          limit = _ref12.limit;
      var user = _ref13.user;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return (0, _auth.requireAuth)(user);

            case 3:
              if (!cursor) {
                _context5.next = 7;
                break;
              }

              _context5.next = 6;
              return _PostComment2.default.find({ post: post, createdAt: { $lt: cursor } }).limit(limit).sort({ createdAt: -1 });

            case 6:
              return _context5.abrupt('return', _context5.sent);

            case 7:
              _context5.next = 9;
              return _PostComment2.default.find({ post: post }).limit(limit).sort({ createdAt: -1 });

            case 9:
              return _context5.abrupt('return', _context5.sent);

            case 12:
              _context5.prev = 12;
              _context5.t0 = _context5['catch'](0);
              throw _context5.t0;

            case 15:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined, [[0, 12]]);
    }));

    function post_comments(_x13, _x14, _x15) {
      return _ref14.apply(this, arguments);
    }

    return post_comments;
  }(),
  /*******************************************************************
   *******************************************************************
    Subscriptions come here
   *******************************************************************
  ********************************************************************/
  //Returns new post 
  new_post: {
    subscribe: (0, _graphqlSubscriptions.withFilter)(function () {
      return _pubsub.pubsub.asyncIterator(NEW_POST);
    }, function (payload, variables) {
      return Boolean(payload.new_post.sector === variables.sector);
    })
  },
  //Returns new post comment 
  post_comment_added: {
    subscribe: (0, _graphqlSubscriptions.withFilter)(function () {
      return _pubsub.pubsub.asyncIterator(POST_COMMENT_ADDED);
    }, function (payload, variables) {
      return Boolean(toString(payload.post_comment_added.post) === toString(variables.post));
    })
  }
};
//# sourceMappingURL=posts-resolvers.js.map