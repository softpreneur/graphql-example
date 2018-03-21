'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Post = require('../../models/Posts/Post');

var _Post2 = _interopRequireDefault(_Post);

var _PostComment = require('../../models/Posts/PostComment');

var _PostComment2 = _interopRequireDefault(_PostComment);

var _Upvote = require('../../models/Posts/Upvote');

var _Upvote2 = _interopRequireDefault(_Upvote);

var _Downvote = require('../../models/Posts/Downvote');

var _Downvote2 = _interopRequireDefault(_Downvote);

var _Course = require('../../models/Courses/Course');

var _Course2 = _interopRequireDefault(_Course);

var _CommentUpvote = require('../../models/Posts/CommentUpvote');

var _CommentUpvote2 = _interopRequireDefault(_CommentUpvote);

var _CommentDownvote = require('../../models/Posts/CommentDownvote');

var _CommentDownvote2 = _interopRequireDefault(_CommentDownvote);

var _auth = require('../../services/auth');

var _pubsub = require('../../config/pubsub');

var _User = require('../../models/User');

var _User2 = _interopRequireDefault(_User);

var _graphqlSubscriptions = require('graphql-subscriptions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var NEW_POST = "new_post";
var POST_UPVOTE_UPDATED = "post_upvote_updated";
var POST_DOWNVOTE_UPDATED = "post_downvote_updated";
var POST_COMMENT_ADDED = "post_comment_added";
var POST_COMMENT_INCREASED = "post_comment_increased";
var POST_COMMENT_UPVOTED = "post_comment_upvoted";
var POST_COMMENT_DOWNVOTED = "post_comment_downvoted";

exports.default = {
  //Creating post by logge user
  create_post: function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, _ref, _ref2) {
      var question = _ref.question;
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
              return _Post2.default.create({ user: user._id, question: question, department: userInfo.department, faculty: userInfo.faculty });

            case 6:
              new_post = _context.sent;

              //New post subscription
              console.log(new_post.department);
              _pubsub.pubsub.publish(NEW_POST, _defineProperty({}, NEW_POST, new_post));
              return _context.abrupt('return', new_post);

            case 12:
              _context.prev = 12;
              _context.t0 = _context['catch'](0);
              throw _context.t0;

            case 15:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[0, 12]]);
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
              return _Post2.default.find({ $or: [{ department: userInfo.department }, { faculty: userInfo.faculty }], createdAt: { $lt: cursor } }).limit(limit).sort({ createdAt: -1 });

            case 7:
              return _context2.abrupt('return', _context2.sent);

            case 8:
              _context2.next = 10;
              return _Post2.default.find({ $or: [{ department: userInfo.department }, { faculty: userInfo.faculty }] }).limit(limit).sort({ createdAt: -1 });

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
  //Upvoting post by logged user
  upvote_post: function () {
    var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_, _ref10, _ref11) {
      var post = _ref10.post;
      var user = _ref11.user;
      var status, v, updated_post_u, upvote_value;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return (0, _auth.requireAuth)(user);

            case 3:
              _context4.next = 5;
              return _Upvote2.default.findOne({ user: user._id, post: post });

            case 5:
              status = _context4.sent;
              v = void 0, updated_post_u = void 0, upvote_value = void 0;

              if (status) {
                _context4.next = 14;
                break;
              }

              _context4.next = 10;
              return _Upvote2.default.create({ user: user._id, post: post });

            case 10:
              upvote_value = +1;
              v = true;
              _context4.next = 18;
              break;

            case 14:
              _context4.next = 16;
              return _Upvote2.default.remove({ user: user._id, post: post });

            case 16:
              upvote_value = -1;
              v = false;

            case 18:
              _context4.next = 20;
              return _Post2.default.findByIdAndUpdate(post, { $inc: { upvote_no: upvote_value } }, { new: true });

            case 20:
              updated_post_u = _context4.sent;

              //Subscription for increase in number of upvote
              _pubsub.pubsub.publish(POST_UPVOTE_UPDATED, _defineProperty({}, POST_UPVOTE_UPDATED, updated_post_u));
              return _context4.abrupt('return', {
                message: "success",
                value: v
              });

            case 25:
              _context4.prev = 25;
              _context4.t0 = _context4['catch'](0);
              return _context4.abrupt('return', {
                message: _context4.t0,
                value: true
              });

            case 28:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined, [[0, 25]]);
    }));

    function upvote_post(_x10, _x11, _x12) {
      return _ref12.apply(this, arguments);
    }

    return upvote_post;
  }(),
  //Downvoting post by log in user
  downvote_post: function () {
    var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_, _ref13, _ref14) {
      var post = _ref13.post;
      var user = _ref14.user;
      var status, v, updated_post_d, downvote_value;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return (0, _auth.requireAuth)(user);

            case 3:
              _context5.next = 5;
              return _Downvote2.default.findOne({ user: user._id, post: post });

            case 5:
              status = _context5.sent;
              v = void 0, updated_post_d = void 0, downvote_value = void 0;

              if (status) {
                _context5.next = 14;
                break;
              }

              _context5.next = 10;
              return _Downvote2.default.create({ user: user._id, post: post });

            case 10:
              downvote_value = +1;
              v = true;
              _context5.next = 18;
              break;

            case 14:
              _context5.next = 16;
              return _Downvote2.default.remove({ user: user._id, post: post });

            case 16:
              downvote_value = -1;
              v = false;

            case 18:
              _context5.next = 20;
              return _Post2.default.findByIdAndUpdate(post, { $inc: { downvote_no: downvote_value } }, { new: true });

            case 20:
              updated_post_d = _context5.sent;

              //Subscription for increase in the number of downvote
              _pubsub.pubsub.publish(POST_DOWNVOTE_UPDATED, _defineProperty({}, POST_DOWNVOTE_UPDATED, updated_post_d));
              return _context5.abrupt('return', {
                message: "success",
                value: v
              });

            case 25:
              _context5.prev = 25;
              _context5.t0 = _context5['catch'](0);
              return _context5.abrupt('return', {
                message: "error",
                value: true
              });

            case 28:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined, [[0, 25]]);
    }));

    function downvote_post(_x13, _x14, _x15) {
      return _ref15.apply(this, arguments);
    }

    return downvote_post;
  }(),
  //Currently logged in user answering questions
  create_post_comment: function () {
    var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_, args, _ref16) {
      var user = _ref16.user;
      var comment, updated_post;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return (0, _auth.requireAuth)(user);

            case 3:
              _context6.next = 5;
              return _PostComment2.default.create(_extends({ user: user._id }, args));

            case 5:
              comment = _context6.sent;

              if (!comment) {
                _context6.next = 15;
                break;
              }

              _context6.next = 9;
              return _Post2.default.findByIdAndUpdate(comment.post, { $inc: { no_answers: +1 } }, { new: true });

            case 9:
              updated_post = _context6.sent;

              //Subscription for increase in number post comments
              _pubsub.pubsub.publish(POST_COMMENT_INCREASED, _defineProperty({}, POST_COMMENT_INCREASED, updated_post));
              //Subscription for new post comment
              _pubsub.pubsub.publish(POST_COMMENT_ADDED, _defineProperty({}, POST_COMMENT_ADDED, comment));
              return _context6.abrupt('return', comment);

            case 15:
              throw new Error("An error occured");

            case 16:
              _context6.next = 21;
              break;

            case 18:
              _context6.prev = 18;
              _context6.t0 = _context6['catch'](0);
              throw _context6.t0;

            case 21:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, undefined, [[0, 18]]);
    }));

    function create_post_comment(_x16, _x17, _x18) {
      return _ref17.apply(this, arguments);
    }

    return create_post_comment;
  }(),
  //Getting the last 7 answers
  post_comments: function () {
    var _ref20 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(_, _ref18, _ref19) {
      var post = _ref18.post,
          cursor = _ref18.cursor,
          limit = _ref18.limit;
      var user = _ref19.user;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return (0, _auth.requireAuth)(user);

            case 3:
              if (!cursor) {
                _context7.next = 7;
                break;
              }

              _context7.next = 6;
              return _PostComment2.default.find({ post: post, createdAt: { $lt: cursor } }).limit(limit).sort({ createdAt: -1 });

            case 6:
              return _context7.abrupt('return', _context7.sent);

            case 7:
              _context7.next = 9;
              return _PostComment2.default.find({ post: post }).limit(limit).sort({ createdAt: -1 });

            case 9:
              return _context7.abrupt('return', _context7.sent);

            case 12:
              _context7.prev = 12;
              _context7.t0 = _context7['catch'](0);
              throw _context7.t0;

            case 15:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, undefined, [[0, 12]]);
    }));

    function post_comments(_x19, _x20, _x21) {
      return _ref20.apply(this, arguments);
    }

    return post_comments;
  }(),
  upvote_post_comment: function () {
    var _ref23 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(_, _ref21, _ref22) {
      var comment = _ref21.comment;
      var user = _ref22.user;
      var check, v, updated_post_comment_u, comment_upvote;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              _context8.next = 3;
              return (0, _auth.requireAuth)(user);

            case 3:
              _context8.next = 5;
              return _CommentUpvote2.default.findOne({ user: user._id, comment: comment });

            case 5:
              check = _context8.sent;
              v = void 0, updated_post_comment_u = void 0, comment_upvote = void 0;

              if (check) {
                _context8.next = 14;
                break;
              }

              _context8.next = 10;
              return _CommentUpvote2.default.create({ user: user._id, comment: comment });

            case 10:
              comment_upvote = +1;
              v = true;
              _context8.next = 18;
              break;

            case 14:
              _context8.next = 16;
              return _CommentUpvote2.default.remove({ user: user._id, comment: comment });

            case 16:
              comment_upvote = -1;
              v = false;

            case 18:
              _context8.next = 20;
              return _PostComment2.default.findByIdAndUpdate(comment, { $inc: { upvote_no: comment_upvote } }, { new: true });

            case 20:
              updated_post_comment_u = _context8.sent;

              //Subscription for post comment upvoted
              _pubsub.pubsub.publish(POST_COMMENT_UPVOTED, _defineProperty({}, POST_COMMENT_UPVOTED, updated_post_comment_u));
              return _context8.abrupt('return', { message: "success", value: v });

            case 25:
              _context8.prev = 25;
              _context8.t0 = _context8['catch'](0);
              return _context8.abrupt('return', {
                message: "error",
                value: true
              });

            case 28:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, undefined, [[0, 25]]);
    }));

    function upvote_post_comment(_x22, _x23, _x24) {
      return _ref23.apply(this, arguments);
    }

    return upvote_post_comment;
  }(),
  downvote_post_comment: function () {
    var _ref26 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(_, _ref24, _ref25) {
      var comment = _ref24.comment;
      var user = _ref25.user;
      var check, v, upvoted_post_comment_d, comment_upvote;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              _context9.next = 3;
              return (0, _auth.requireAuth)(user);

            case 3:
              _context9.next = 5;
              return _CommentDownvote2.default.findOne({ user: user._id, comment: comment });

            case 5:
              check = _context9.sent;
              v = void 0, upvoted_post_comment_d = void 0, comment_upvote = void 0;

              if (check) {
                _context9.next = 14;
                break;
              }

              _context9.next = 10;
              return _CommentDownvote2.default.create({ user: user._id, comment: comment });

            case 10:
              comment_downvote = +1;
              v = true;
              _context9.next = 18;
              break;

            case 14:
              _context9.next = 16;
              return _CommentDownvote2.default.remove({ user: user._id, comment: comment });

            case 16:
              comment_downvote = -1;
              v = false;

            case 18:
              _context9.next = 20;
              return _PostComment2.default.findByIdAndUpdate(comment, { $inc: { downvote_no: comment_downvote } }, { new: true });

            case 20:
              upvoted_post_comment_d = _context9.sent;

              //Subscription for post comment downvoted
              _pubsub.pubsub.publish(POST_COMMENT_DOWNVOTED, _defineProperty({}, POST_COMMENT_DOWNVOTED, upvoted_post_comment_d));
              return _context9.abrupt('return', { message: "success", value: v });

            case 25:
              _context9.prev = 25;
              _context9.t0 = _context9['catch'](0);
              return _context9.abrupt('return', {
                message: "error",
                value: true
              });

            case 28:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, undefined, [[0, 25]]);
    }));

    function downvote_post_comment(_x25, _x26, _x27) {
      return _ref26.apply(this, arguments);
    }

    return downvote_post_comment;
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
      var b = Boolean(payload.new_post.department === variables.department);
      console.log(b);
      console.log(payload.new_post.department);
      console.log(variables.department);
    })
  },
  //Returns whole post with updated upvote number
  post_upvote_updated: {
    subscribe: (0, _graphqlSubscriptions.withFilter)(function () {
      return _pubsub.pubsub.asyncIterator(POST_UPVOTE_UPDATED);
    }, function (payload, variables) {
      return Boolean(payload.post_upvote_updated.department === variables.department);
    })
  },
  //Returns whole Post with updated downvote number
  post_downvote_updated: {
    subscribe: (0, _graphqlSubscriptions.withFilter)(function () {
      return _pubsub.pubsub.asyncIterator(POST_DOWNVOTE_UPDATED);
    }, function (payload, variables) {
      return Boolean(payload.post_downvote_updated.department === variables.department);
    })
  },
  //Returns new post comment 
  post_comment_added: {
    subscribe: (0, _graphqlSubscriptions.withFilter)(function () {
      return _pubsub.pubsub.asyncIterator(POST_COMMENT_ADDED);
    }, function (payload, variables) {
      return Boolean(toString(payload.post_comment_added.post) === toString(variables.post));
    })
  },
  //Returns posts with updated number
  post_comment_increased: {
    subscribe: (0, _graphqlSubscriptions.withFilter)(function () {
      return _pubsub.pubsub.asyncIterator(POST_COMMENT_INCREASED);
    }, function (payload, variables) {
      return Boolean(toString(payload.post_comment_increased.department) === toString(variables.department));
    })
  },
  //Returns post comment with updated upvote
  post_comment_upvoted: {
    subscribe: (0, _graphqlSubscriptions.withFilter)(function () {
      return _pubsub.pubsub.asyncIterator(POST_COMMENT_UPVOTED);
    }, function (payload, variables) {
      return Boolean(payload.post_comment_upvoted.department === variables.department);
    })
  },
  //Returns post comment with updated downvoted
  post_comment_downvoted: {
    subscribe: (0, _graphqlSubscriptions.withFilter)(function () {
      return _pubsub.pubsub.asyncIterator(POST_COMMENT_DOWNVOTED);
    }, function (payload, variables) {
      return Boolean(payload.post_comment_downvoted.department === variables.department);
    })
  }
};
//# sourceMappingURL=posts-resolvers.js.map