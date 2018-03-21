'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Summary = require('../../models/Summaries/Summary');

var _Summary2 = _interopRequireDefault(_Summary);

var _Upvote = require('../../models/Summaries/Upvote');

var _Upvote2 = _interopRequireDefault(_Upvote);

var _Downvote = require('../../models/Summaries/Downvote');

var _Downvote2 = _interopRequireDefault(_Downvote);

var _SummaryComment = require('../../models/Summaries/SummaryComment');

var _SummaryComment2 = _interopRequireDefault(_SummaryComment);

var _SavedSummary = require('../../models/Summaries/SavedSummary');

var _SavedSummary2 = _interopRequireDefault(_SavedSummary);

var _UserSummaryStatus = require('../../models/Summaries/UserSummaryStatus');

var _UserSummaryStatus2 = _interopRequireDefault(_UserSummaryStatus);

var _auth = require('../../services/auth');

var _User = require('../../models/User');

var _User2 = _interopRequireDefault(_User);

var _pubsub = require('../../config/pubsub');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//import { constants } from 'os';

var SUMMARY_ADDED = "summary_added";
var SUMMARY_COMMENT_INCREASED = "summary_comment_increased";
var NEW_SUMMARY_COMMENT = "new_summary_comment";
var SUMMARY_UPVOTED = "summary_upvoted";
var SUMMARY_DOWNVOTED = "summary_downvoted";

exports.default = {
  //Creating summary by summarizer
  create_summary: function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, args, _ref) {
      var user = _ref.user;
      var check, summary;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return (0, _auth.requireAuth)(user);

            case 3:
              _context.next = 5;
              return _Summary2.default.findOne({ user: user._id, course: args.course, topic: args.topic });

            case 5:
              check = _context.sent;

              if (!check) {
                _context.next = 10;
                break;
              }

              return _context.abrupt('return', { message: "success", value: true });

            case 10:
              _context.next = 12;
              return _Summary2.default.create(_extends({ user: user._id }, args));

            case 12:
              summary = _context.sent;
              _context.next = 15;
              return _Upvote2.default.create({ summary: summary._id, user: user._id, status: false });

            case 15:
              _context.next = 17;
              return _Downvote2.default.create({ summary: summary._id, user: user._id, status: false });

            case 17:

              //Subscription for new summary
              _pubsub.pubsub.publish(SUMMARY_ADDED, _defineProperty({}, SUMMARY_ADDED, summary));
              //Responding to user with success message
              return _context.abrupt('return', { message: "success", value: true });

            case 19:
              _context.next = 24;
              break;

            case 21:
              _context.prev = 21;
              _context.t0 = _context['catch'](0);
              return _context.abrupt('return', {
                message: "error",
                value: true
              });

            case 24:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[0, 21]]);
    }));

    function create_summary(_x, _x2, _x3) {
      return _ref2.apply(this, arguments);
    }

    return create_summary;
  }(),
  //getting list of summaries for logged student base on course selected
  summaries: function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, _ref3, _ref4) {
      var course = _ref3.course;
      var user = _ref4.user;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return (0, _auth.requireAuth)(user);

            case 3:
              _context2.next = 5;
              return _Summary2.default.find({ course: course, report: false }).sort({ createdAt: -1 }).limit(7);

            case 5:
              return _context2.abrupt('return', _context2.sent);

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

    function summaries(_x4, _x5, _x6) {
      return _ref5.apply(this, arguments);
    }

    return summaries;
  }(),
  //Viewing specific summary by logged user
  view_summary: function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_, _ref6, _ref7) {
      var summary = _ref6.summary;
      var user = _ref7.user;

      var userInfo, view_status, sumContent, _sumContent;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return (0, _auth.requireAuth)(user);

            case 3:
              userInfo = _context3.sent;
              _context3.next = 6;
              return _UserSummaryStatus2.default.findOne({ summary: summary, user: userInfo._id });

            case 6:
              view_status = _context3.sent;

              if (!view_status) {
                _context3.next = 14;
                break;
              }

              _context3.next = 10;
              return _Summary2.default.findById(summary).select({ content: 1, _id: 0 });

            case 10:
              sumContent = _context3.sent;
              return _context3.abrupt('return', {
                message: sumContent,
                value: true
              });

            case 14:
              if (!(userInfo.coin >= 2)) {
                _context3.next = 25;
                break;
              }

              _context3.next = 17;
              return _Summary2.default.findById(summary).select({ content: 1, _id: 0 });

            case 17:
              _sumContent = _context3.sent;
              _context3.next = 20;
              return _UserSummaryStatus2.default.create({ user: user._id, summary: summary, view_status: true });

            case 20:
              _context3.next = 22;
              return _User2.default.update({ _id: userInfo._id }, { coin: userInfo.coin - 2 });

            case 22:
              return _context3.abrupt('return', {
                message: _sumContent,
                value: true
              });

            case 25:
              return _context3.abrupt('return', {
                message: "no_coin",
                value: false
              });

            case 26:
              _context3.next = 31;
              break;

            case 28:
              _context3.prev = 28;
              _context3.t0 = _context3['catch'](0);
              return _context3.abrupt('return', {
                message: "error",
                value: true
              });

            case 31:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined, [[0, 28]]);
    }));

    function view_summary(_x7, _x8, _x9) {
      return _ref8.apply(this, arguments);
    }

    return view_summary;
  }(),
  //Reporting specific sumamry by user reading it
  report_summary: function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_, _ref9, _ref10) {
      var summary = _ref9.summary;
      var user = _ref10.user;
      var report, m;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return (0, _auth.requireAuth)(user);

            case 3:
              _context4.next = 5;
              return _Summary2.default.update({ _id: summary }, { $set: { report: true } });

            case 5:
              report = _context4.sent;
              m = "failed";

              if (report) {
                m = "success";
              }
              return _context4.abrupt('return', {
                message: m,
                value: true
              });

            case 11:
              _context4.prev = 11;
              _context4.t0 = _context4['catch'](0);
              return _context4.abrupt('return', {
                message: "error",
                value: true
              });

            case 14:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined, [[0, 11]]);
    }));

    function report_summary(_x10, _x11, _x12) {
      return _ref11.apply(this, arguments);
    }

    return report_summary;
  }(),
  //Un-reeporting summary by admin
  un_report_summary: function () {
    var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_, _ref12, _ref13) {
      var summary = _ref12.summary;
      var user = _ref13.user;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _Summary2.default.update({ _id: summary }, { $set: { report: false } });

            case 3:
              return _context5.abrupt('return', {
                message: "success",
                value: true
              });

            case 6:
              _context5.prev = 6;
              _context5.t0 = _context5['catch'](0);
              return _context5.abrupt('return', {
                message: _context5.t0,
                value: true
              });

            case 9:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined, [[0, 6]]);
    }));

    function un_report_summary(_x13, _x14, _x15) {
      return _ref14.apply(this, arguments);
    }

    return un_report_summary;
  }(),
  //Getting reported summaries
  reported_summaries: function () {
    var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_, args, _ref15) {
      var user = _ref15.user;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              return _context6.abrupt('return', _Summary2.default.find({ report: true }).limit(10));

            case 4:
              _context6.prev = 4;
              _context6.t0 = _context6['catch'](0);
              throw _context6.t0;

            case 7:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, undefined, [[0, 4]]);
    }));

    function reported_summaries(_x16, _x17, _x18) {
      return _ref16.apply(this, arguments);
    }

    return reported_summaries;
  }(),
  //Creating comment by a user viewing a summary
  create_summary_comment: function () {
    var _ref19 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(_, _ref17, _ref18) {
      var summary = _ref17.summary,
          comment = _ref17.comment;
      var user = _ref18.user;
      var check, new_summary;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return (0, _auth.requireAuth)(user);

            case 3:
              _context7.next = 5;
              return _SummaryComment2.default.findOne({ summary: summary, user: user._id, comment: comment });

            case 5:
              check = _context7.sent;

              if (check) {
                _context7.next = 13;
                break;
              }

              _context7.next = 9;
              return _SummaryComment2.default.create({ user: user._id, summary: summary, comment: comment });

            case 9:
              _context7.next = 11;
              return _Summary2.default.findByIdAndUpdate({ _id: summary }, { $inc: { no_comments: +1 } }, { new: true });

            case 11:
              new_summary = _context7.sent;

              //Subscription for new comments added 
              _pubsub.pubsub.publish(NEW_SUMMARY_COMMENT, _defineProperty({}, NEW_SUMMARY_COMMENT, new_summary));

            case 13:
              return _context7.abrupt('return', {
                message: "success",
                value: true
              });

            case 16:
              _context7.prev = 16;
              _context7.t0 = _context7['catch'](0);
              return _context7.abrupt('return', {
                message: "error",
                value: true
              });

            case 19:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, undefined, [[0, 16]]);
    }));

    function create_summary_comment(_x19, _x20, _x21) {
      return _ref19.apply(this, arguments);
    }

    return create_summary_comment;
  }(),
  //Getting list of summary comments
  summary_comments: function () {
    var _ref22 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(_, _ref20, _ref21) {
      var summary = _ref20.summary;
      var user = _ref21.user;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              _context8.next = 3;
              return (0, _auth.requireAuth)(user);

            case 3:
              _context8.next = 5;
              return _SummaryComment2.default.findOne({ summary: summary }).sort({ createdAt: -1 }).limit(7);

            case 5:
              return _context8.abrupt('return', _context8.sent);

            case 8:
              _context8.prev = 8;
              _context8.t0 = _context8['catch'](0);
              throw _context8.t0;

            case 11:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, undefined, [[0, 8]]);
    }));

    function summary_comments(_x22, _x23, _x24) {
      return _ref22.apply(this, arguments);
    }

    return summary_comments;
  }(),
  //Upvoting summary by log in user
  upvote_summary: function () {
    var _ref25 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(_, _ref23, _ref24) {
      var summary = _ref23.summary;
      var user = _ref24.user;
      var status, v, new_summary_upvote;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              _context9.next = 3;
              return (0, _auth.requireAuth)(user);

            case 3:
              _context9.next = 5;
              return _Upvote2.default.findOne({ user: user._id, summary: summary });

            case 5:
              status = _context9.sent;
              v = void 0, new_summary_upvote = void 0;

              if (status) {
                _context9.next = 16;
                break;
              }

              _context9.next = 10;
              return _Upvote2.default.create({ summary: summary, user: user._id });

            case 10:
              _context9.next = 12;
              return _Summary2.default.findByIdAndUpdate(summary, { $inc: { upvote_no: +1 } }, { new: true });

            case 12:
              new_summary_upvote = _context9.sent;

              v = true;
              _context9.next = 22;
              break;

            case 16:
              _context9.next = 18;
              return _Upvote2.default.remove({ user: user._id, summary: summary });

            case 18:
              _context9.next = 20;
              return _Summary2.default.findByIdAndUpdate(summary, { $inc: { upvote_no: -1 } }, { new: true });

            case 20:
              new_summary_upvote = _context9.sent;

              v = false;

            case 22:
              //Returning updated summary to subscribed user
              _pubsub.pubsub.publish(SUMMARY_UPVOTED, _defineProperty({}, SUMMARY_UPVOTED, new_summary_upvote));
              return _context9.abrupt('return', {
                message: "success",
                value: v
              });

            case 26:
              _context9.prev = 26;
              _context9.t0 = _context9['catch'](0);
              return _context9.abrupt('return', {
                message: _context9.t0,
                value: true
              });

            case 29:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, undefined, [[0, 26]]);
    }));

    function upvote_summary(_x25, _x26, _x27) {
      return _ref25.apply(this, arguments);
    }

    return upvote_summary;
  }(),
  //Downvoting summary by log in user
  downvote_summary: function () {
    var _ref28 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(_, _ref26, _ref27) {
      var summary = _ref26.summary;
      var user = _ref27.user;
      var status, v, new_summary_downvote;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.prev = 0;
              _context10.next = 3;
              return (0, _auth.requireAuth)(user);

            case 3:
              _context10.next = 5;
              return _Downvote2.default.findOne({ user: user._id, summary: summary });

            case 5:
              status = _context10.sent;
              v = void 0, new_summary_downvote = void 0;

              if (status) {
                _context10.next = 16;
                break;
              }

              _context10.next = 10;
              return _Downvote2.default.create({ summary: summary, user: user._id });

            case 10:
              _context10.next = 12;
              return _Summary2.default.findByIdAndUpdate(summary, { $inc: { downvote_no: +1 } }, { new: true });

            case 12:
              new_summary_downvote = _context10.sent;

              v = true;
              _context10.next = 22;
              break;

            case 16:
              _context10.next = 18;
              return _Downvote2.default.remove({ user: user._id, summary: summary });

            case 18:
              _context10.next = 20;
              return _Summary2.default.findByIdAndUpdate(summary, { $inc: { downvote_no: -1 } }, { new: true });

            case 20:
              new_summary_downvote = _context10.sent;

              v = true;

            case 22:
              //Returning the updated summary to users that has subscribed to this summary
              _pubsub.pubsub.publish(SUMMARY_DOWNVOTED, _defineProperty({}, SUMMARY_DOWNVOTED, new_summary_downvote));
              return _context10.abrupt('return', {
                message: "success",
                value: v
              });

            case 26:
              _context10.prev = 26;
              _context10.t0 = _context10['catch'](0);
              return _context10.abrupt('return', {
                message: "error",
                value: true
              });

            case 29:
            case 'end':
              return _context10.stop();
          }
        }
      }, _callee10, undefined, [[0, 26]]);
    }));

    function downvote_summary(_x28, _x29, _x30) {
      return _ref28.apply(this, arguments);
    }

    return downvote_summary;
  }(),
  /*******************************************************************
   *******************************************************************
    Subscriptions come here
   *******************************************************************
  ********************************************************************/
  //New summary Subscription
  summary_added: {
    //For new summary added
    subscribe: function subscribe() {
      return _pubsub.pubsub.asyncIterator(SUMMARY_ADDED);
    }
  },
  //Return new comment
  new_summary_comment: {
    //For new comment added
    subscribe: function subscribe() {
      return _pubsub.pubsub.asyncIterator(NEW_SUMMARY_COMMENT);
    }
  },
  //Return the whole summary with increase or decrease in the number upvote 
  summary_upvoted: {
    //For increase in summary upvote
    subscribe: function subscribe() {
      return _pubsub.pubsub.asyncIterator(SUMMARY_UPVOTED);
    }
  },
  //Returns the whole summary with increase or decrease in the number of downvotes
  summary_downvoted: {
    //For increase in summary upvote
    subscribe: function subscribe() {
      return _pubsub.pubsub.asyncIterator(SUMMARY_DOWNVOTED);
    }
  }
};
//# sourceMappingURL=summaries-resolvers.js.map